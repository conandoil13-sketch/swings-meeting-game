import { GAME_CONFIG } from "../data/config";

export function getDeadlineDrainMultiplier(deadlineProgress: number) {
  if (deadlineProgress <= GAME_CONFIG.deadlineCriticalThreshold) {
    return 1.65;
  }

  if (deadlineProgress <= GAME_CONFIG.deadlineDangerThreshold) {
    return 1.25;
  }

  return 1;
}

export function getTickDrain(deltaMs: number, deadlineProgress: number) {
  const baseDrain = (deltaMs / 1000) * GAME_CONFIG.tickDrainPerSecond;
  return baseDrain * getDeadlineDrainMultiplier(deadlineProgress);
}
