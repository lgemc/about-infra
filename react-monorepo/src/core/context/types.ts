export interface Context {
  Value(key: string): any;
  SetValue(key: string, value: any): Context;
  GetAll(): { [key: string]: any };
}

export enum ContextKeys {
  BearerToken = "BearerToken",
  ClientID = "ClientID",
}

class ContextClass {
  data: { [key: string]: any };
  parent: Context | undefined = undefined;

  constructor() {
    this.data = {};
  }

  Value(key: string): any {
    return this.data[key];
  }

  SetValue(key: string, value: any) {
    this.data[key] = value;

    return this;
  }

  GetAll(): { [key: string]: any } {
    return this.data;
  }
}

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

const context = {
  WithValue,
  Background,
  Extend,
};

export default context;
