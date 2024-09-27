import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./cra-template-rmw/template/src/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);