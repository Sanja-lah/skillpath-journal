import type { Track } from "../types/Track";
import { useSkillPath } from "../context/SkillPathContext";

type TrackItemProps = {
  track: Track;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TrackItem({ track, onToggle, onDelete }: TrackItemProps) {
  const { sessions } = useSkillPath();

  const sessionCount = sessions.filter((session) => session.trackId === track.id).length;

  let sessionLabel;

  if (sessionCount === 0) {
    sessionLabel = "No sessions yet";
  } else if (sessionCount === 1) {
    sessionLabel = "1 session";
  } else {
    sessionLabel = `${sessionCount} sessions`;
  }

  return (
    <li className="track-item">
      <div className="track-row">
        <div className="track-main">
          <strong>{track.title}</strong> <span className="track-status">— {track.status}</span>
        </div>

        <div className="track-actions">
          <button type="button" onClick={() => onToggle(track.id)}>
            Toggle
          </button>

          <button type="button" onClick={() => onDelete(track.id)}>
            Delete
          </button>
        </div>
      </div>

      <p className="track-description">{track.description}</p>
      <p className="track-sessions">{sessionLabel}</p>
    </li>
  );
}
