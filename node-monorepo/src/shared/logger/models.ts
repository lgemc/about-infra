import { Context } from "@atelier/core/context";

export enum LogLevel {
  Error = "error",
  Info = "info",
  Critical = "critical",
  Warning = "warning",
}
export interface LogInput {
  event: string;
  level: LogLevel;
  data?: object;
  time?: Date; // if not set, default is Date.now()
  tenant_id?: string;
}

export interface Logger {
  log(ctx: Context, input: LogInput): void;
}
