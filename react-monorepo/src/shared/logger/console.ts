import { Context } from "@atelier/core/context/types";
import { LogInput, Logger, LogLevel } from "@atelier/core/logs/types";

function buildText(ctx: Context, input: LogInput): string {
  const ctxVals = ctx !== undefined ? ctx.GetAll() : {};
  let data = { ...ctxVals };
  if (input.data) {
    data = { ...data, ...input.data };
  }

  let levelIcon = "✅";
  switch (input.level) {
    case LogLevel.Critical:
      levelIcon = "🔥";
      break;
    case LogLevel.Info:
      levelIcon = "✅";
      break;
    case LogLevel.Error:
      levelIcon = "🛑";
      break;
    case LogLevel.Warning:
      levelIcon = "🟡";
      break;
  }

  let textValues = "";
  for (const key of Object.keys(data)) {
    textValues += `${key}: ${data[key]}\n`;
  }
  return (
    "-----------\n" +
    `Log level ${input.level} ${levelIcon}\n` +
    `Event 🔄: ${input.event}\n` +
    `\n\n${textValues}` +
    "-------------\n"
  );
}

export class ConsoleLogger implements Logger {
  log(ctx: Context, input: LogInput) {
    console.log(buildText(ctx, input));
  }
}

const defaultLogger = new ConsoleLogger();

export function logToConsole(ctx: Context, input: LogInput) {
  defaultLogger.log(ctx, input);
}
