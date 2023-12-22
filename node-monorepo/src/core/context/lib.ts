import { generateID } from "@atelier/shared/crypto";
import { Context, ContextClass } from "./types";
import { ContextValues } from "./values";

export function Background(): Context {
  return new ContextClass();
}

export function Extend(ctx: Context | undefined) {
  if (ctx === undefined || ctx.GetAll === undefined) {
    return Background();
  }

  const newCtx = Background();
  const vals = ctx.GetAll();
  for (const key of Object.keys(vals)) {
    newCtx.SetValue(key, ctx.Value(key));
  }

  return newCtx;
}

export function WithValue(ctx: Context, key: string, value: string): Context {
  const newCtx = Extend(ctx);

  newCtx.SetValue(key, value);

  return newCtx;
}

export function WithRequestID(ctx: Context): Context {
  return WithValue(
    ctx,
    ContextValues.RequestID,
    generateID({ length: 20, prefix: "REQ" })
  );
}

export function WithClientID(ctx: Context, clientID: string): Context {
  return WithValue(ctx, ContextValues.ClientID, clientID);
}

export default {
  Background,
  Extend,
  WithClientID,
  WithRequestID,
  WithValue,
};
