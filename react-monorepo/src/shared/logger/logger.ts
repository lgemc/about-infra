import { Context } from "@aimo/front/core/context/types";
import { Logger, LogInput } from "@aimo/front/core/logs/types";

import { ConsoleLogger } from "./console";

let defaultLogger: Logger = new ConsoleLogger();

export function MockLogger(fn: (input: any) => {}) {
  defaultLogger = {
    log(ctx: Context, input: LogInput) {
      fn(input);
    },
  };
}

export function log(ctx: Context, input: LogInput) {
  defaultLogger.log(ctx, input);
}
