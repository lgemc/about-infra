import React from "react";
import context, { Context } from "./types";

export default React.createContext({
  ctx: context.Background(),
  setCtx: (ctx: Context | ((ctx: Context) => Context)) => {},
});
