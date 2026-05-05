import { ArtistId, PortraitMode } from "../types/artist";
import { getAssetUrl } from "./asset";

const PORTRAIT_FILE_MAP: Record<ArtistId, string> = {
  giriboy: "giriboy.webp",
  youngb: "youngb.webp",
  hanyohan: "hanyohan.webp",
  blacknut: "blacknut.webp",
  cjamm: "cjamm.webp",
  noel: "noel.webp",
  okasian: "okashi.webp",
  nochang: "nochang.webp",
  justhis: "justhis.webp",
  kidmilli: "kidmilli.webp"
};

export function getPortraitSrc(artistId: ArtistId, mode: PortraitMode) {
  const filename = PORTRAIT_FILE_MAP[artistId];
  const resolvedMode = mode === "caricature" ? "photo" : mode;
  return getAssetUrl(`/assets/portraits/${resolvedMode}/${filename}`);
}

export function getInitials(name: string) {
  const compact = name.replace(/[()]/g, "").trim();
  return compact.slice(0, 2);
}

export function getDisplayName(name: string) {
  return name.replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
}
