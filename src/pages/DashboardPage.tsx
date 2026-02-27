import { useSkillPath } from "../context/SkillPathContext";

export default function DashboardPage() {
  const { tracks, sessions } = useSkillPath();

  const totalTracks = tracks.length;
  const completedTracks = tracks.filter((t) => t.status === "completed").length;
  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce(
    (sum, session) => sum + session.durationMinutes,
    0
  );

  const hasTracks = totalTracks > 0;

  return (
    <section className="page">
      <header className="page-header">
        <h2 className="page-title">Dashboard</h2>
        <p className="page-subtitle">
          Overview of your tracks and sessions.
        </p>
      </header>

      {!hasTracks ? (
        <p>
          You have not added any tracks yet. Add a track to see your progress here.
        </p>
      ) : (
        <>
          <p>Progress summary</p>

          <ul className="stats-list">
            <li className="stats-item">
              Total tracks: <span className="stats-number">{totalTracks}</span>
            </li>
            <li className="stats-item">
              Completed tracks:{" "}
              <span className="stats-number">{completedTracks}</span>
            </li>
            <li className="stats-item">
              Total sessions:{" "}
              <span className="stats-number">{totalSessions}</span>
            </li>
            <li className="stats-item">
              Total time:{" "}
              <span className="stats-number">{totalMinutes} min</span>
            </li>
          </ul>
        </>
      )}
    </section>
  );
}