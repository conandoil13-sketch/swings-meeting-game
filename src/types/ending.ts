export type EndingId =
  | "miracle-on-time"
  | "master-delivered"
  | "released-anyway"
  | "viral-but-hollow"
  | "meeting-forever"
  | "almost-classic"
  | "ceo-walkout"
  | "go-separate-ways"
  | "settlement-bankrupt"
  | "quality-evaporated"
  | "barely-held"
  | "burned-for-art"
  | "silent-release";

export type Ending = {
  id: EndingId;
  title: string;
  summary: string;
};
