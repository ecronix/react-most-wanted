import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@ecronix/base-shell";
import config from "./config";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App config={config} />
  </StrictMode>,
);

serviceWorkerRegistration.register({
  onUpdate: (reg) => {
    window.update = () => {
      try {
        reg.waiting.postMessage({ type: "SKIP_WAITING" });
        window.location.reload();
      } catch (error) {
        console.warn("error", error);
      }
    };
  },
});
