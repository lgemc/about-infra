import context from "@atelier/core/context";
import { buildObject } from "@atelier/core/errors/lib";
import { logCritical } from "@atelier/shared/logger";
import { ParameterizedContext } from "koa";

const errorCatcher = async (ctx: ParameterizedContext, next) => {
  try {
    await next();
  } catch (e) {
    logCritical(context.Background(), "handler_failed", buildObject(e));
  }
};

export default errorCatcher;
