import { Context } from "@atelier/core/context";
import DatabaseEmitter from "@atelier/services/db/emmiter";
import EventEmitter from "events";
import { err, ok, Result } from "neverthrow";

var emitter = new DatabaseEmitter();

async function getEmitter(ctx: Context): Promise<Result<EventEmitter, Error>> {
  if (emitter.started()) {
    return ok(emitter);
  }

  const result = await emitter.setup(ctx);
  if (result.isErr()) {
    return err(result.error);
  }

  emitter = result.value;

  return ok(emitter);
}

export default getEmitter;
