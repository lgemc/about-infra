import React from "react";
import { Context } from "@atelier/core/context/types";
import { LogInput, LogLevel, Source } from "./types";

export default React.createContext({
  source: Source.Dashboard,
  log: (logInput: { event: string; level: LogLevel; data?: object }) => {},
});
