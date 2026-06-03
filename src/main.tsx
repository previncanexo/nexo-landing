
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(<App />);

  // Quitar el loader recién cuando React pintó su primer frame (doble rAF) para no
  // dejar un flash de pantalla azul entre el loader y el contenido.
  requestAnimationFrame(() =>
    requestAnimationFrame(() => document.getElementById("boot-loader")?.remove()),
  );
  