import { useEffect, useState } from "react";
import { getPortraitMode } from "../../data/config";
import { Artist, PortraitMode } from "../../types/artist";
import { getDisplayName, getInitials, getPortraitSrc } from "../../utils/image";
import "./Portrait.css";

type PortraitProps = {
  artist: Artist;
  mode?: PortraitMode;
};

export function Portrait({ artist, mode = getPortraitMode() }: PortraitProps) {
  const [hasError, setHasError] = useState(false);
  const src = getPortraitSrc(artist.id, mode);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div className="portrait portrait--placeholder" aria-label={`${artist.name} placeholder`}>
        <span className="portrait__initials">{getInitials(artist.name)}</span>
        <span className="portrait__name">{getDisplayName(artist.name)}</span>
      </div>
    );
  }

  return (
    <div className="portrait">
      <img
        alt={artist.name}
        className="portrait__image"
        src={src}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
