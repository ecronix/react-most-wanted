import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@ecronix/base-shell/containers/App";
import config from "./config";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App config={config} />
  </StrictMode>,
);
