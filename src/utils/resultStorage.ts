import { EndingId } from "../types/ending";
import { GameState } from "../types/game";

const STORAGE_KEY = "swings-meeting-game:results";

export type StoredResult = {
  endingId: EndingId | null;
  endedAt: string;
  elapsedMs: number;
  money: number;
  mental: number;
  crew: number;
  quality: number;
  deadlineProgress: number;
  turn: number;
};

export type ResultStoragePayload = {
  recent: StoredResult[];
  bestQualityRun: StoredResult | null;
};

function isStorageAvailable() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readStoredResults(): ResultStoragePayload {
  if (!isStorageAvailable()) {
    return { recent: [], bestQualityRun: null };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return { recent: [], bestQualityRun: null };
    }

    return JSON.parse(raw) as ResultStoragePayload;
  } catch {
    return { recent: [], bestQualityRun: null };
  }
}

export function saveResult(state: GameState) {
  if (!isStorageAvailable()) {
    return;
  }

  const payload = readStoredResults();
  const result: StoredResult = {
    endingId: state.endingId,
    endedAt: new Date().toISOString(),
    elapsedMs: state.elapsedMs,
    money: state.money,
    mental: state.mental,
    crew: state.crew,
    quality: state.quality,
    deadlineProgress: state.deadlineProgress,
    turn: state.turn
  };

  const nextRecent = [result, ...payload.recent].slice(0, 5);
  const nextBest =
    !payload.bestQualityRun || result.quality >= payload.bestQualityRun.quality
      ? result
      : payload.bestQualityRun;

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      recent: nextRecent,
      bestQualityRun: nextBest
    } satisfies ResultStoragePayload)
  );
}
