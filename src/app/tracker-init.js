// tracker-init.js
import { initTracker } from "@/blocker-tracker/tracker.mjs";

if (typeof window !== "undefined") {
  initTracker({
    endpoint: "http://localhost:3001/sdk/blockers",
    apiKey: "proj_78b8a5bd6268ae16",
    environment: "development"
  });
}