import { Context } from "@atelier/core/context";
import { build } from "./string";
import { LogInput, Logger, LogLevel } from "./models";

export class ConsoleLogger implements Logger {
  log(ctx: Context, input: LogInput) {
    console.log(build(ctx, input));
  }
}

const defaultLogger = new ConsoleLogger();

export function logToConsole(ctx: Context, input: LogInput) {
  if (!input.time) {
    input.time = new Date();
  }

  defaultLogger.log(ctx, input);
}
