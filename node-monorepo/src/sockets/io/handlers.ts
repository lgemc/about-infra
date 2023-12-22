import { Context } from "@atelier/core/context";
import { err, Result } from "neverthrow";
import { Server } from "socket.io";
import getEmitter from "@atelier/core/database/emitter";
import { log, logInfo, LogLevel } from "@atelier/shared/logger";
import { buildObject } from "@atelier/core/errors/lib";
import { Events } from "@atelier/services/db/types";

const room = "rappi-demo";
/**
 * Subscribe to database changes
 *
 * Tables subscribed to:
 * - messages
 * - contacts
 * - conversations
 *
 * All data is sent only to the tenant that owns the data
 **/
async function subscribeToDatabase(
  ctx: Context,
  input: {
    io: Server;
  }
): Promise<Result<void, Error>> {
  logInfo(ctx, "sync_started", {});

  const emitter = await getEmitter(ctx);
  if (emitter.isErr()) {
    log(ctx, {
      level: LogLevel.Critical,
      event: "socket.io.subscribe",
      data: {
        message: "Failed to get database emitter",
        error: buildObject(emitter.error),
      },
    });

    return err(emitter.error);
  }

  emitter.value.on(Events.DATA, (val) => {
    log(ctx, {
      event: "sending_data_to_socket",
      level: LogLevel.Info,
      data: {
        topic: val.topic,
        room,
      },
    });

    input.io.to(room).emit(`/${val.topic}`, val?.change);
  });
}

export default subscribeToDatabase;
