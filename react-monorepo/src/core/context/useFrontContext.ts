import { useState } from "react";
import context from "./types";
import { ContextValues } from "./Values";

const useFrontContext = (input?: { clientID?: string }) => {
  const [ctx, setCtx] = useState(context.Background());

  if (input?.clientID) {
    ctx.SetValue(ContextValues.ClientID, input.clientID);
  }

  return {
    setCtx,
    ctx,
  };
};

export default useFrontContext;
