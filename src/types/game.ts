import { GameCardData } from "./card";
import { EndingId } from "./ending";

export type StatKey = "money" | "mental" | "crew" | "quality";

export type GameStats = Record<StatKey, number>;

export type GamePhase = "title" | "howto" | "playing" | "ended";

export type GameSpecialState = {
  blacknutVersePending: boolean;
  blacknutPayoffQueued: boolean;
  okasianChaosTurns: number;
  kidmilliMoodboardTurns: number;
};

export type GameState = {
  phase: GamePhase;
  money: number;
  mental: number;
  crew: number;
  quality: number;
  deadlineProgress: number;
  elapsedMs: number;
  deck: GameCardData[];
  currentCardIndex: number;
  turn: number;
  isGameOver: boolean;
  endingId: EndingId | null;
  lastChoiceLabel: string | null;
  special: GameSpecialState;
};

export type GameSnapshot = Pick<
  GameState,
  "money" | "mental" | "crew" | "quality" | "deadlineProgress" | "currentCardIndex" | "isGameOver" | "endingId"
>;

export type GameAction =
  | { type: "START_GAME" }
  | { type: "OPEN_HOWTO" }
  | { type: "GO_TO_TITLE" }
  | { type: "APPLY_CHOICE"; direction: "left" | "right" }
  | { type: "TICK"; deltaMs: number }
  | { type: "RESTART_GAME" };
