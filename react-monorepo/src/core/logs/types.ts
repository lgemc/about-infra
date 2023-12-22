import { Context } from "../context/types";

export enum LogLevel {
  Error = "error",
  Info = "info",
  Critical = "critical",
  Warning = "warning",
}

// Source is a the possible front deployment place where the logs comes
export enum Source {
  ShopifyAdmin = "shopify-admin",
  ShopifyCustomer = "shopify-customer",
  Dashboard = "dashboard",
}

export interface LogInput {
  event: string;
  level: LogLevel;
  source?: Source;
  data?: object;
  tenantId?: string;
}

export interface Logger {
  log(ctx: Context, input: LogInput): void;
}
