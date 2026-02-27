import { useState, useRef } from "react";

import { useSkillPath } from "../context/SkillPathContext";
import type { Session } from "../types/Session";

export default function SessionsPage() {
  const { tracks, sessions, addSession, deleteSession } = useSkillPath();

  const [trackId, setTrackId] = useState("");
  const [date, setDate] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const trackSelectRef = useRef<HTMLSelectElement | null>(null);

  const totalSessions = sessions.length;
  const sessionWord = totalSessions === 1 ? "session" : "sessions";


  const sortedSessions = [...sessions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.durationMinutes,
    0
  );

  const minuteWord = totalMinutes === 1 ? "minute" : "minutes";


  const hasTracks = tracks.length > 0;

  const isFormValid =
    hasTracks &&
    trackId.trim() !== "" &&
    date.trim() !== "" &&
    durationMinutes.trim() !== "";

  function handleAddSession() {
    if (
      trackId.trim() === "" ||
      date.trim() === "" ||
      durationMinutes.trim() === ""
    ) {
      setError("Track, date and duration are required.");
      return;
    }

    const durationNumber = Number(durationMinutes);

    if (Number.isNaN(durationNumber) || durationNumber <= 0) {
      setError("Duration must be a positive number.");
      return;
    }

    const newSession: Session = {
      id: Date.now().toString(),
      trackId,
      date,
      durationMinutes: durationNumber,
      note,
    };

    addSession(newSession);

    setTrackId("");
    setDate("");
    setDurationMinutes("");
    setNote("");
    setError("");

    trackSelectRef.current?.focus();
  }

  return (
    <section className="page">
      <header className="page-header">
        <h2 className="page-title">Sessions</h2>
        <p className="page-subtitle">
          Log and review your study sessions.
        </p>
      </header>

      {!hasTracks ? (
        <p>
          You need at least one track before logging a session. Go to the Tracks
          page to add your first track.
        </p>
      ) : (
        <>
          <div className="card form-group">
            <h3>Add study session</h3>

            <select
              ref={trackSelectRef}
              value={trackId}
              onChange={(e) => {
                setTrackId(e.target.value);
                setError("");
              }}
            >
              <option value="">Select track</option>
              {tracks.map((track) => (
                <option key={track.id} value={track.id}>
                  {track.title}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError("");
              }}
            />

            <input
              type="number"
              placeholder="Duration in minutes"
              value={durationMinutes}
              onChange={(e) => {
                setDurationMinutes(e.target.value);
                setError("");
              }}
            />

            <input
              type="text"
              placeholder="Notes (optional)"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setError("");
              }}
            />

            <button
              type="button"
              onClick={handleAddSession}
              disabled={!isFormValid}
              className="btn-primary"
            >
              Add Session
            </button>

            {error && <p className="error-text">{error}</p>}
          </div>

          <div className="card">
            {totalSessions === 0 ? (
              <p>You have not logged any sessions yet.</p>
            ) : (
              <>
                <p>
                  You have logged {totalSessions} {sessionWord} so far ({totalMinutes} {minuteWord} total).
                </p>

                <ul className="session-list">
                  {sortedSessions.map((session) => {
                    const relatedTrack = tracks.find(
                      (track) => track.id === session.trackId
                    );

                    const formattedDate = new Date(session.date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    );

                    const durationWord =
                      session.durationMinutes === 1 ? "minute" : "minutes";

                    return (
                      <li key={session.id} className="session-item">
                        <div className="session-main">
                          <strong>{relatedTrack?.title}</strong> — {session.durationMinutes} {durationWord}{" "}
                          <button
                            type="button"
                            onClick={() => deleteSession(session.id)}
                            className="btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                        <div className="session-meta">
                          {formattedDate}
                          {session.note && <> — {session.note}</>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </>
      )}
    </section>
  );
}
