import { cards } from "../data/cards";
import { GAME_CONFIG } from "../data/config";
import { buildDeck, resolveCurrentCard, resolveNextCardIndex } from "../engine/cardResolver";
import { resolveEnding } from "../engine/endingResolver";
import { applyPassiveSpecialRules, applySpecialRules } from "../engine/specialRules";
import { getTickDrain } from "../engine/timerEngine";
import { clamp } from "../utils/clamp";
import { CardEffects, ChoiceDirection } from "../types/card";
import { GameAction, GameState } from "../types/game";

function clampValue(value: number) {
  return clamp(value, 0, 100);
}

function applyEffects(state: GameState, effects: CardEffects) {
  return {
    money: clampValue(state.money + (effects.money ?? 0)),
    mental: clampValue(state.mental + (effects.mental ?? 0)),
    crew: clampValue(state.crew + (effects.crew ?? 0)),
    quality: clampValue(state.quality + (effects.quality ?? 0)),
    deadlineProgress: clampValue(state.deadlineProgress + (effects.deadlineProgress ?? 0))
  };
}

function finalizeState(state: GameState): GameState {
  const endingId = resolveEnding(state);

  if (!endingId) {
    return {
      ...state,
      isGameOver: false,
      endingId: null
    };
  }

  return {
    ...state,
    phase: "ended",
    isGameOver: true,
    endingId
  };
}

export function createFreshRun(): Omit<GameState, "phase"> {
  return {
    money: GAME_CONFIG.initialMoney,
    mental: GAME_CONFIG.initialMental,
    crew: GAME_CONFIG.initialCrew,
    quality: GAME_CONFIG.initialQuality,
    deadlineProgress: GAME_CONFIG.initialDeadlineProgress,
    elapsedMs: 0,
    deck: buildDeck(cards),
    currentCardIndex: 0,
    turn: 0,
    isGameOver: false,
    endingId: null,
    lastChoiceLabel: null,
    special: {
      blacknutVersePending: false,
      blacknutPayoffQueued: false,
      okasianChaosTurns: 0,
      kidmilliMoodboardTurns: 0
    }
  };
}

export function resolveChoice(state: GameState, direction: ChoiceDirection): GameState {
  const card = resolveCurrentCard(state);
  const choiceLabel = direction === "left" ? card.leftChoice : card.rightChoice;
  const choiceEffects = direction === "left" ? card.leftEffects : card.rightEffects;
  const nextValues = applyEffects(state, choiceEffects);

  const nextState: GameState = {
    ...state,
    ...nextValues,
    currentCardIndex: resolveNextCardIndex(state),
    turn: state.turn + 1,
    lastChoiceLabel: choiceLabel
  };

  return finalizeState(
    applySpecialRules({
      state,
      card,
      direction,
      nextState
    })
  );
}

export function applyDeadlineTick(state: GameState, deltaMs: number): GameState {
  const nextState = applyPassiveSpecialRules({
    ...state,
    elapsedMs: state.elapsedMs + deltaMs,
    deadlineProgress: clampValue(
      state.deadlineProgress - getTickDrain(deltaMs, state.deadlineProgress)
    )
  });

  return finalizeState(nextState);
}

export function createInitialGameState(): GameState {
  return {
    phase: "title",
    ...createFreshRun()
  };
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "OPEN_HOWTO":
      return {
        ...state,
        phase: "howto"
      };
    case "GO_TO_TITLE":
      return {
        ...state,
        phase: "title"
      };
    case "START_GAME":
      return {
        phase: "playing",
        ...createFreshRun()
      };
    case "APPLY_CHOICE":
      if (state.phase !== "playing") {
        return state;
      }

      return resolveChoice(state, action.direction);
    case "TICK":
      if (state.phase !== "playing") {
        return state;
      }

      return applyDeadlineTick(state, action.deltaMs);
    case "RESTART_GAME":
      return {
        phase: "playing",
        ...createFreshRun()
      };
    default:
      return state;
  }
}
