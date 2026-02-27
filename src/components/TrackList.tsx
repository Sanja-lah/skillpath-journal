import type { Track } from "../types/Track";
import TrackItem from "./TrackItem";

type TrackListProps = {
  tracks: Track[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TrackList({
  tracks,
  onToggle,
  onDelete,
}: TrackListProps) {
  return (
    <ul>
      {tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
