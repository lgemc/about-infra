import { Context } from "@atelier/core/context";
import { LogInput, LogLevel } from "./models";

export function build(ctx: Context, input: LogInput): string {
  const ctxVals =
    ctx !== undefined && ctx.GetAll !== undefined ? ctx.GetAll() : {};
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
    if (key === "error" && data[key] && data[key].message) {
      textValues += `${key}: ${data[key].message}\n`;
      continue;
    }

    if (typeof data[key] === "object") {
      textValues += `${key}: ${JSON.stringify(data[key])}\n`;
      continue;
    }

    textValues += `${key}: ${data[key]}\n`;
  }
  return (
    "-----------\n" +
    `Log level ${input.level} ${levelIcon}\n` +
    `Event 🔄: ${input.event}\n` +
    `Date: ${input.time}\n` +
    `\n\n${textValues}` +
    "-------------\n"
  );
}
