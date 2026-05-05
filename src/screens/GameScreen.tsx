import { Dispatch, useEffect, useMemo, useRef, useState } from "react";
import { GameCard } from "../components/Card/GameCard";
import { Button } from "../components/Common/Button";
import { ScreenFrame } from "../components/Common/ScreenFrame";
import {
  FloatingChangeItem,
  FloatingStatChange
} from "../components/Feedback/FloatingStatChange";
import { DeadlineBar } from "../components/HUD/DeadlineBar";
import "../components/HUD/HUD.css";
import { artists } from "../data/artists";
import { resolveCurrentCard } from "../engine/cardResolver";
import { getCardPresentation } from "../engine/specialRules";
import { useAudio } from "../hooks/useAudio";
import { useGameLoop } from "../hooks/useGameLoop";
import { useSwipe } from "../hooks/useSwipe";
import { ChoiceDirection } from "../types/card";
import { GameAction, GameState } from "../types/game";

type GameScreenProps = {
  state: GameState;
  dispatch: Dispatch<GameAction>;
};

export function GameScreen({ state, dispatch }: GameScreenProps) {
  const [pendingDirection, setPendingDirection] = useState<ChoiceDirection | null>(null);
  const [floatingChanges, setFloatingChanges] = useState<FloatingChangeItem[]>([]);
  const [statHighlights, setStatHighlights] = useState<
    Partial<Record<"money" | "mental" | "crew" | "quality", "up" | "down" | null>>
  >({});
  const previousStateRef = useRef(state);
  const deadlineAlertStageRef = useRef<"normal" | "danger" | "critical">("normal");
  const gameoverPlayedRef = useRef(false);
  const currentCard = resolveCurrentCard(state);
  const currentArtist = useMemo(
    () => artists.find((artist) => artist.id === currentCard.artistId) ?? artists[0],
    [currentCard.artistId]
  );
  const currentPresentation = useMemo(
    () => getCardPresentation(state, currentCard),
    [currentCard, state]
  );
  const statGraphItems = useMemo(
    () => [
      { label: "잔고", value: state.money, tone: "money", highlight: statHighlights.money ?? null },
      {
        label: "멘탈",
        value: state.mental,
        tone: "mental",
        highlight: statHighlights.mental ?? null
      },
      { label: "식구", value: state.crew, tone: "crew", highlight: statHighlights.crew ?? null },
      {
        label: "완성",
        value: state.quality,
        tone: "quality",
        highlight: statHighlights.quality ?? null
      }
    ],
    [state.money, state.mental, state.crew, state.quality, statHighlights]
  );
  const { play } = useAudio();

  useGameLoop(state.phase === "playing", (deltaMs) => {
    dispatch({ type: "TICK", deltaMs });
  });

  const commitChoice = (direction: ChoiceDirection) => {
    if (pendingDirection) {
      return;
    }

    play("swipe");
    setPendingDirection(direction);
  };

  const chooseLeft = () => commitChoice("left");
  const chooseRight = () => commitChoice("right");

  const { swipeBindings, dragOffsetX, previewDirection, resetSwipe } = useSwipe({
    onSwipeLeft: chooseLeft,
    onSwipeRight: chooseRight
  });

  useEffect(() => {
    if (!pendingDirection) {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatch({ type: "APPLY_CHOICE", direction: pendingDirection });
      setPendingDirection(null);
      resetSwipe();
    }, 120);

    return () => window.clearTimeout(timeout);
  }, [dispatch, pendingDirection, resetSwipe]);

  useEffect(() => {
    resetSwipe();
  }, [state.currentCardIndex, resetSwipe]);

  useEffect(() => {
    const previous = previousStateRef.current;

    if (state.turn !== previous.turn) {
      const deltas = [
        { stat: "money" as const, delta: state.money - previous.money },
        { stat: "mental" as const, delta: state.mental - previous.mental },
        { stat: "crew" as const, delta: state.crew - previous.crew },
        { stat: "quality" as const, delta: state.quality - previous.quality },
        {
          stat: "deadlineProgress" as const,
          delta: state.deadlineProgress - previous.deadlineProgress
        }
      ].filter((entry) => entry.delta !== 0);

      if (deltas.length > 0) {
        setFloatingChanges((current) => [
          ...current,
          ...deltas.map((entry, index) => ({
            id: `${state.turn}-${entry.stat}-${index}`,
            stat: entry.stat,
            delta: entry.delta
          }))
        ]);
      }

      const nextHighlights: Partial<
        Record<"money" | "mental" | "crew" | "quality", "up" | "down" | null>
      > = {};

      for (const entry of deltas) {
        if (entry.stat === "deadlineProgress") {
          continue;
        }

        nextHighlights[entry.stat] = entry.delta > 0 ? "up" : "down";
      }

      setStatHighlights(nextHighlights);

      const hasBigPositive = deltas.some((entry) => entry.delta >= 6);
      const hasBigNegative = deltas.some((entry) => entry.delta <= -6);

      if (hasBigPositive) {
        play("stat-up");
      } else if (hasBigNegative) {
        play("stat-down");
      }

      if (Object.keys(nextHighlights).length > 0) {
        const timeout = window.setTimeout(() => {
          setStatHighlights({});
        }, 450);

        previousStateRef.current = state;
        return () => window.clearTimeout(timeout);
      }
    }

    previousStateRef.current = state;
  }, [play, state]);

  useEffect(() => {
    if (state.phase === "ended" && state.isGameOver && !gameoverPlayedRef.current) {
      gameoverPlayedRef.current = true;
      play("gameover");
    }
    if (state.phase === "playing") {
      gameoverPlayedRef.current = false;
    }
  }, [play, state.isGameOver, state.phase]);

  useEffect(() => {
    const nextStage =
      state.deadlineProgress <= 20
        ? "critical"
        : state.deadlineProgress <= 50
          ? "danger"
          : "normal";

    if (nextStage !== deadlineAlertStageRef.current && nextStage !== "normal") {
      play("alert");
    }

    deadlineAlertStageRef.current = nextStage;
  }, [play, state.deadlineProgress]);

  useEffect(() => {
    if (floatingChanges.length === 0) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFloatingChanges((current) => current.slice(1));
    }, 780);

    return () => window.clearTimeout(timeout);
  }, [floatingChanges]);

  useEffect(() => {
    if (state.phase !== "playing") {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (pendingDirection) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const tagName = target?.tagName;

      if (
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT" ||
        target?.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        commitChoice("left");
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        commitChoice("right");
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [pendingDirection, state.phase]);

  return (
    <ScreenFrame className="game-screen">
      <header className="game-screen__top">
        <div className="game-screen__top-row">
          <DeadlineBar value={state.deadlineProgress} />
          <span>TURN {state.turn + 1}</span>
        </div>
        <div className="game-screen__mini-graph" aria-hidden="true">
          {statGraphItems.map((item) => (
            <div
              key={item.label}
              className={`game-screen__mini-graph-item ${
                item.highlight ? `game-screen__mini-graph-item--${item.highlight}` : ""
              }`.trim()}
            >
              <div className="game-screen__mini-graph-track">
                <div
                  className={`game-screen__mini-graph-fill game-screen__mini-graph-fill--${item.tone}`}
                  style={{ height: `${Math.max(10, Math.round(item.value))}%` }}
                />
              </div>
              <span className="game-screen__mini-graph-name">{item.label}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="game-screen__card-zone" {...swipeBindings}>
        <div className="game-screen__floating-layer" aria-hidden="true">
          {floatingChanges.map((item) => (
            <FloatingStatChange key={item.id} item={item} />
          ))}
        </div>
        <GameCard
          artist={currentArtist}
          card={currentCard}
          displayLeftChoice={currentPresentation.leftChoice}
          displayRightChoice={currentPresentation.rightChoice}
          dragOffsetX={
            pendingDirection ? (pendingDirection === "left" ? -110 : 110) : dragOffsetX
          }
          previewDirection={pendingDirection ?? previewDirection}
          isCommitting={Boolean(pendingDirection)}
        />
      </div>

      <footer className="game-screen__bottom">
        <div className="game-screen__hint-row">
          {state.lastChoiceLabel ? <span>직전 선택: {state.lastChoiceLabel}</span> : <span>좌우로 빠르게 결정</span>}
          <span>스와이프 또는 버튼</span>
        </div>

        <div className="game-screen__controls">
          <Button variant="ghost" disabled={Boolean(pendingDirection)} onClick={chooseLeft}>
            {currentPresentation.leftChoice}
          </Button>
          <Button disabled={Boolean(pendingDirection)} onClick={chooseRight}>
            {currentPresentation.rightChoice}
          </Button>
        </div>
      </footer>
    </ScreenFrame>
  );
}
