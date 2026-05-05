import { EndingId } from "../types/ending";
import { GameState } from "../types/game";

type EndingSnapshot = Pick<
  GameState,
  "money" | "mental" | "crew" | "quality" | "deadlineProgress"
>;

export function resolveImmediateEnding(state: EndingSnapshot): EndingId | null {
  if (state.money <= 0) {
    return "settlement-bankrupt";
  }

  if (state.mental <= 0) {
    return "ceo-walkout";
  }

  if (state.crew <= 0) {
    return "go-separate-ways";
  }

  if (state.quality <= 0) {
    return "quality-evaporated";
  }

  return null;
}

export function resolveDeadlineEnding(state: EndingSnapshot): EndingId | null {
  if (state.deadlineProgress > 0) {
    return null;
  }

  if (state.quality >= 80 && state.money >= 55 && state.mental >= 55 && state.crew >= 55) {
    return "miracle-on-time";
  }

  if (state.quality >= 78 && state.money >= 35 && state.mental >= 40 && state.crew >= 40) {
    return "master-delivered";
  }

  if (state.quality >= 75 && state.money <= 25) {
    return "burned-for-art";
  }

  if (state.money >= 70 && state.quality <= 45) {
    return "viral-but-hollow";
  }

  if (state.quality >= 60 && state.money >= 35 && state.mental >= 35 && state.crew >= 35) {
    return "released-anyway";
  }

  if (state.quality >= 58 && state.money >= 20 && state.mental >= 25 && state.crew >= 25) {
    return "almost-classic";
  }

  if (state.quality >= 45 && state.money >= 20 && state.mental >= 20 && state.crew >= 20) {
    return "barely-held";
  }

  if (state.quality >= 35 && state.money >= 30 && state.mental >= 30 && state.crew >= 30) {
    return "silent-release";
  }

  if (state.money <= 20) {
    return "settlement-bankrupt";
  }

  if (state.mental <= 25) {
    return "ceo-walkout";
  }

  if (state.crew <= 25) {
    return "go-separate-ways";
  }

  if (state.quality <= 25) {
    return "quality-evaporated";
  }

  return "meeting-forever";
}

export function resolveEnding(state: EndingSnapshot): EndingId | null {
  return resolveImmediateEnding(state) ?? resolveDeadlineEnding(state);
}
