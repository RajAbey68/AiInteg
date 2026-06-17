import { App } from "@/App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found. Cannot mount application.");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
