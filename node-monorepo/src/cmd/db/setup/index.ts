import { logError, logInfo } from "@atelier/shared/logger";
import context from "@atelier/core/context";
import lib from "@atelier/shared/rethinkdb/lib";
async function setup(): Promise<void> {
  let result = await lib.setup(context.Background());
  if (result.isErr()) {
    logError(context.Background(), "setup", result.error);
  }

  logInfo(context.Background(), "setup", { message: "Setup complete" });
}

setup();
