import { ParameterizedContext } from "koa";
import context, { Context } from "@atelier/core/context";

const contextKey = "atelier-ctx";

function setContext(ctx: ParameterizedContext, $ctx: Context) {
  ctx.state[contextKey] = $ctx;
}

function getContext(ctx: ParameterizedContext) {
  return ctx.state[contextKey] || context.Background();
}

const koalib = {
  setContext,
  getContext,
};

export default koalib;
