import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">SkillPath Journal</h1>

        <nav className="app-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tracks"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Tracks
          </NavLink>

          <NavLink
            to="/sessions"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Sessions
          </NavLink>

          <NavLink
            to="/inspiration"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Inspiration
          </NavLink>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="app-footer">
        <p>&copy; 2026 SkillPath Journal</p>
      </footer>
    </div>
  );
}
