'use client'

import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "./store";
import "../tracker-init";


export function Providers({ children }) {

  return <Provider store={store}>{children}</Provider>;
}