import { sortCardsByDifficulty, getStageForTurn, type CardStage } from "./difficultyCurve";
import { GameCardData } from "../types/card";
import { GameState } from "../types/game";

const DECK_SIZE = 32;
const OKASIAN_PENALTY = 2;

function hasStage(card: GameCardData, stage: CardStage) {
  return card.tags.includes(stage);
}

function pickCard(
  pool: GameCardData[],
  stage: CardStage,
  usedIds: Set<string>,
  recentArtists: string[],
  artistCounts: Map<string, number>
) {
  const stagePool = pool.filter((card) => hasStage(card, stage) && !usedIds.has(card.id));
  const sorted = sortCardsByDifficulty(stagePool, stage);
  const artistFiltered = sorted.filter((card) => !recentArtists.includes(card.artistId));
  const candidatePool = artistFiltered.length > 0 ? artistFiltered : sorted;

  const rankedCandidates = candidatePool
    .slice(0, Math.min(6, candidatePool.length))
    .sort((a, b) => {
      const aCount =
        (artistCounts.get(a.artistId) ?? 0) + (a.artistId === "okasian" ? OKASIAN_PENALTY : 0);
      const bCount =
        (artistCounts.get(b.artistId) ?? 0) + (b.artistId === "okasian" ? OKASIAN_PENALTY : 0);
      return aCount - bCount;
    });

  const topArtistCount =
    (artistCounts.get(rankedCandidates[0]?.artistId ?? "") ?? 0) +
    (rankedCandidates[0]?.artistId === "okasian" ? OKASIAN_PENALTY : 0);
  const balancedCandidates = rankedCandidates.filter(
    (card) =>
      (artistCounts.get(card.artistId) ?? 0) +
        (card.artistId === "okasian" ? OKASIAN_PENALTY : 0) ===
      topArtistCount
  );
  const candidate =
    balancedCandidates[Math.floor(Math.random() * balancedCandidates.length)] ??
    rankedCandidates[0];

  if (!candidate) {
    const fallback = pool.find((card) => !usedIds.has(card.id));
    return fallback ?? pool[0];
  }

  return candidate;
}

export function buildDeck(cardPool: GameCardData[], deckSize: number = DECK_SIZE) {
  const deck: GameCardData[] = [];
  const usedIds = new Set<string>();
  const recentArtists: string[] = [];
  const artistCounts = new Map<string, number>();
  const finalSize = Math.min(deckSize, cardPool.length);

  for (let index = 0; index < finalSize; index += 1) {
    const stage = getStageForTurn(index, finalSize);
    const selected = pickCard(cardPool, stage, usedIds, recentArtists, artistCounts);

    deck.push(selected);
    usedIds.add(selected.id);
    recentArtists.unshift(selected.artistId);
    artistCounts.set(selected.artistId, (artistCounts.get(selected.artistId) ?? 0) + 1);

    if (recentArtists.length > 2) {
      recentArtists.pop();
    }
  }

  return deck;
}

export function resolveCurrentCard(state: Pick<GameState, "deck" | "currentCardIndex">): GameCardData {
  return state.deck[state.currentCardIndex % state.deck.length];
}

export function resolveNextCardIndex(state: Pick<GameState, "currentCardIndex" | "deck">) {
  return (state.currentCardIndex + 1) % state.deck.length;
}
