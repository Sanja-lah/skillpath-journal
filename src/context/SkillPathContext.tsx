import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { Track } from "../types/Track";
import type { Session } from "../types/Session";

const TRACKS_STORAGE_KEY = "skillpath_tracks";
const SESSIONS_STORAGE_KEY = "skillpath_sessions";

function loadInitialTracks(): Track[] {
  const stored = window.localStorage.getItem(TRACKS_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Track[];
  } catch {
    return [];
  }
}

function loadInitialSessions(): Session[] {
  const stored = window.localStorage.getItem(SESSIONS_STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Session[];
  } catch {
    return [];
  }
}

type SkillPathContextValue = {
  tracks: Track[];
  sessions: Session[];
  addTrack: (track: Track) => void;
  toggleTrackStatus: (trackId: string) => void;
  deleteTrack: (trackId: string) => void;
  addSession: (session: Session) => void;
  deleteSession: (sessionId: string) => void;
};

const SkillPathContext = createContext<SkillPathContextValue | undefined>(
  undefined
);

type SkillPathProviderProps = {
  children: ReactNode;
};

export function SkillPathProvider({ children }: SkillPathProviderProps) {
  const [tracks, setTracks] = useState<Track[]>(loadInitialTracks);
  const [sessions, setSessions] = useState<Session[]>(loadInitialSessions);

  function addTrack(track: Track) {
    setTracks((prevTracks) => [...prevTracks, track]);
  }

  function toggleTrackStatus(trackId: string) {
    setTracks((prevTracks) =>
      prevTracks.map((track) => {
        if (track.id !== trackId) return track;

        return {
          ...track,
          status: track.status === "completed" ? "in-progress" : "completed",
        };
      })
    );
  }

  function deleteTrack(trackId: string) {
  setTracks((prevTracks) =>
    prevTracks.filter((track) => track.id !== trackId)
  );

  setSessions((prevSessions) =>
    prevSessions.filter((session) => session.trackId !== trackId)
  );
}

  function addSession(session: Session) {
    setSessions((prevSessions) => [...prevSessions, session]);
  }

  function deleteSession(sessionId: string) {
    setSessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== sessionId)
    );
  }

  useEffect(() => {
    window.localStorage.setItem(TRACKS_STORAGE_KEY, JSON.stringify(tracks));
  }, [tracks]);

  useEffect(() => {
    window.localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
  }, [sessions]);

  const value: SkillPathContextValue = {
    tracks,
    sessions,
    addTrack,
    toggleTrackStatus,
    deleteTrack,
    addSession,
    deleteSession,
  };

  return (
    <SkillPathContext.Provider value={value}>
      {children}
    </SkillPathContext.Provider>
  );
}

export function useSkillPath() {
  const context = useContext(SkillPathContext);

  if (!context) {
    throw new Error("useSkillPath must be used within SkillPathProvider");
  }

  return context;
}