import { buildObject } from "../../core/errors/lib";
import { Background, Context } from "../../core/context";
import { ConsoleLogger } from "./console";
import { Logger, LogInput, LogLevel } from "./models";

let defaultLogger: Logger = new ConsoleLogger();

export function log(ctx: Context, input: LogInput) {
  if (!ctx || !ctx.Value) {
    ctx = Background();
  }

  if (!input.time) {
    input.time = new Date();
  }

  defaultLogger.log(ctx, input);
}

export function logCritical(
  ctx: Context,
  event: string,
  data: LogInput["data"]
) {
  return log(ctx, {
    event,
    data,
    level: LogLevel.Critical,
  });
}

export function logError(ctx: Context, event: string, error: Error) {
  return log(ctx, {
    event,
    data: buildObject(error),
    level: LogLevel.Critical,
  });
}

export function logWarning(ctx: Context, event: string, data: any) {
  return log(ctx, {
    event,
    data,
    level: LogLevel.Warning,
  });
}

export function logInfo(ctx: Context, event: string, data: LogInput["data"]) {
  return log(ctx, {
    event,
    data,
    level: LogLevel.Info,
  });
}
