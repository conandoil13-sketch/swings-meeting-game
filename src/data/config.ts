import { PortraitMode } from "../types/artist";

export const GAME_CONFIG = {
  title: "납기까지 단체회의",
  portraitMode: "photo" as PortraitMode,
  maxDeadline: 100,
  tickDrainPerSecond: 7.5,
  deadlineWarningThreshold: 20,
  deadlineDangerThreshold: 50,
  deadlineCriticalThreshold: 25,
  swipeThreshold: 60,
  initialMoney: 70,
  initialMental: 70,
  initialCrew: 70,
  initialQuality: 50,
  initialDeadlineProgress: 100
};

export function getPortraitMode(): PortraitMode {
  return GAME_CONFIG.portraitMode;
}
