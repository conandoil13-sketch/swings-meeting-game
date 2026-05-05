import { Artist } from "../../types/artist";
import { ChoiceDirection, GameCardData } from "../../types/card";
import { Portrait } from "../Portrait/Portrait";
import "./GameCard.css";

type GameCardProps = {
  artist: Artist;
  card: GameCardData;
  displayLeftChoice?: string;
  displayRightChoice?: string;
  dragOffsetX?: number;
  previewDirection?: ChoiceDirection | null;
  isCommitting?: boolean;
};

export function GameCard({
  artist,
  card,
  displayLeftChoice,
  displayRightChoice,
  dragOffsetX = 0,
  previewDirection = null,
  isCommitting = false
}: GameCardProps) {
  const rotation = Math.max(-10, Math.min(10, dragOffsetX / 12));
  const leftChoiceText = displayLeftChoice ?? card.leftChoice;
  const rightChoiceText = displayRightChoice ?? card.rightChoice;

  return (
    <section
      className={`game-card ${previewDirection ? `game-card--preview-${previewDirection}` : ""} ${
        isCommitting ? "game-card--committing" : ""
      }`.trim()}
      style={{ transform: `translateX(${dragOffsetX}px) rotate(${rotation}deg)` }}
    >
      <div className="game-card__preview-rails" aria-hidden="true">
        <div className="game-card__preview game-card__preview--left">{leftChoiceText}</div>
        <div className="game-card__preview game-card__preview--right">{rightChoiceText}</div>
      </div>

      <div className="game-card__portrait-wrap">
        <Portrait artist={artist} />
      </div>

      <div className="game-card__meta">
        <div className="game-card__identity">
          <span className="game-card__name">{artist.name}</span>
          <span className="game-card__trait-summary">{artist.traitSummary}</span>
        </div>
        <span className="game-card__vibe">{artist.traitTag}</span>
      </div>

      <div className="game-card__body">
        <p className="game-card__prompt">{card.text}</p>
        {card.context ? <p className="game-card__context">{card.context}</p> : null}
      </div>

      <div className="game-card__tags">
        {card.tags.map((tag) => (
          <span key={tag} className="game-card__tag">
            #{tag}
          </span>
        ))}
      </div>

      <div className="game-card__choices">
        <div className="game-card__choice game-card__choice--left">
          <span>L</span>
          <strong>{leftChoiceText}</strong>
        </div>
        <div className="game-card__choice game-card__choice--right">
          <strong>{rightChoiceText}</strong>
          <span>R</span>
        </div>
      </div>
    </section>
  );
}
