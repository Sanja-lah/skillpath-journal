import { useState } from "react";

import TrackList from "../components/TrackList";
import { useSkillPath } from "../context/SkillPathContext";
import type { Track } from "../types/Track";

export default function TracksPage() {
  const { tracks, addTrack, toggleTrackStatus, deleteTrack } = useSkillPath();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const isFormValid =
    title.trim() !== "" && description.trim() !== "";

  const totalTracks = tracks.length;
  const tracksWord = totalTracks === 1 ? "track" : "tracks";

  const hasTracks = tracks.length > 0;

  function handleAddTrack() {
    if (title.trim() === "" || description.trim() === "") {
      setError("Both fields are required.");
      return;
    }

    const newTrack: Track = {
      id: Date.now().toString(),
      title,
      description,
      status: "planned",
    };

    addTrack(newTrack);

    setTitle("");
    setDescription("");
    setError("");
  }

  return (
    <section className="page">
      <header className="page-header">
        <h2 className="page-title">Tracks</h2>
        <p className="page-subtitle">
          Plan and manage your learning tracks.
        </p>
      </header>

      <div className="card form-group">
        <input
          type="text"
          placeholder="Track title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError("");
          }}
        />

        <button
          type="button"
          onClick={handleAddTrack}
          disabled={!isFormValid}
          className="btn-primary"
        >
          Add Track
        </button>

        {error && <p className="error-text">{error}</p>}
      </div>

      {hasTracks && (
        <p className="tracks-summary">
          You currently have {totalTracks} {tracksWord}.
        </p>
      )}

      {hasTracks ? (
        <TrackList
          tracks={tracks}
          onToggle={toggleTrackStatus}
          onDelete={deleteTrack}
        />
      ) : (
        <p>You have not added any tracks yet.</p>
      )}
    </section>
  );
}
