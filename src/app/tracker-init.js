// tracker-init.js
import { initTracker } from "@/blocker-tracker/tracker.mjs";

if (typeof window !== "undefined") {
  initTracker({
    endpoint: "http://localhost:3001/sdk/blockers",
    apiKey: "proj_d971ef99d15153d1",
    environment: "development"
  });
}