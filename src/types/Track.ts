export type TrackStatus = "planned" | "in-progress" | "completed";

export type Track = {
  id: string;
  title: string;
  description: string;
  status: TrackStatus;
};
