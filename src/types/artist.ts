export type ArtistId =
  | "giriboy"
  | "youngb"
  | "hanyohan"
  | "blacknut"
  | "cjamm"
  | "noel"
  | "okasian"
  | "nochang"
  | "justhis"
  | "kidmilli";

export type PortraitMode = "photo" | "caricature";

export type Artist = {
  id: ArtistId;
  name: string;
  traitSummary: string;
  traitTag: string;
};
