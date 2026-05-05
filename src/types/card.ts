import { ArtistId } from "./artist";
import { StatKey } from "./game";

export type ChoiceDirection = "left" | "right";

export type CardEffects = Partial<Record<StatKey | "deadlineProgress", number>>;

export type GameCardData = {
  id: string;
  artistId: ArtistId;
  text: string;
  context?: string;
  leftChoice: string;
  rightChoice: string;
  leftEffects: CardEffects;
  rightEffects: CardEffects;
  tags: string[];
};
