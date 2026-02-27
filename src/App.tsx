import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import DashboardPage from "./pages/DashboardPage";
import SessionsPage from "./pages/SessionsPage";
import TracksPage from "./pages/TracksPage";
import InspirationPage from "./pages/InspirationPage";

export default function App() {
  return ( 
    <Layout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tracks" element={<TracksPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/inspiration" element={<InspirationPage />} />
      </Routes>
    </Layout>
  );
}
