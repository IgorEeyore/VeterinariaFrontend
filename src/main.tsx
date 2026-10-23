import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Aplicación principal
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);