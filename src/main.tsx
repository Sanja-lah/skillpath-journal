import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { SkillPathProvider } from "./context/SkillPathContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SkillPathProvider>
        <App />
      </SkillPathProvider>
    </BrowserRouter>
  </StrictMode>
);
