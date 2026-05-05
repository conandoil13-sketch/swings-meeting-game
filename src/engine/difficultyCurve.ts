import { GameCardData } from "../types/card";

export type CardStage = "early" | "mid" | "late";

function getCardRiskScore(card: GameCardData) {
  const left = card.leftEffects;
  const right = card.rightEffects;
  const negativeValues = [
    -(left.deadlineProgress ?? 0),
    -(right.deadlineProgress ?? 0),
    -(left.money ?? 0),
    -(right.money ?? 0),
    -(left.mental ?? 0),
    -(right.mental ?? 0),
    -(left.crew ?? 0),
    -(right.crew ?? 0),
    -(left.quality ?? 0),
    -(right.quality ?? 0)
  ].filter((value) => value > 0);

  const score = negativeValues.reduce((sum, value) => sum + value, 0);

  if (card.tags.includes("risky")) {
    return score + 6;
  }

  if (card.tags.includes("stable")) {
    return Math.max(0, score - 4);
  }

  return score;
}

export function getStageForTurn(turnIndex: number, totalTurns: number): CardStage {
  const progress = turnIndex / totalTurns;

  if (progress < 0.34) {
    return "early";
  }

  if (progress < 0.7) {
    return "mid";
  }

  return "late";
}

export function getTargetRiskForStage(stage: CardStage) {
  if (stage === "early") {
    return 8;
  }

  if (stage === "mid") {
    return 13;
  }

  return 18;
}

export function sortCardsByDifficulty(stageCards: GameCardData[], stage: CardStage) {
  const targetRisk = getTargetRiskForStage(stage);

  return stageCards
    .slice()
    .sort((a, b) => {
      const aDistance = Math.abs(getCardRiskScore(a) - targetRisk);
      const bDistance = Math.abs(getCardRiskScore(b) - targetRisk);
      return aDistance - bDistance;
    });
}
