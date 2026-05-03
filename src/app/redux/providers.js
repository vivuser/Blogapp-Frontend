'use client'

import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "./store";
import { initTracker } from "@/blocker-tracker/tracker.mjs";

export function Providers({ children }) {

  useEffect(() => {
    initTracker({
      endpoint: "http://localhost:3001/sdk/blockers",
      apiKey: "proj_d971ef99d15153d1",
      environment: "development"
    });
  }, []);

  return <Provider store={store}>{children}</Provider>;
}