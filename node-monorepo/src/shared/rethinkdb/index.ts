import { err, ok, Result } from "neverthrow";
import { r, Connection } from "rethinkdb-ts";

import { Context } from "../../core/context";
import env, { Vars } from "../../shared/env";

const defaultPort = 28015;

let conn: Connection;

async function getConnection(ctx: Context): Promise<Result<Connection, Error>> {
  if (conn) {
    return ok(conn);
  }

  const port = env.number(Vars.RETHINK_DB_PORT, defaultPort);
  if (port.isErr()) {
    return err(port.error);
  }

  try {
    const $conn = await r.connect({
      host: env.string(Vars.RETHINK_DB_HOST),
      port: port.value,
    });

    conn = $conn;

    return ok(conn);
  } catch (e) {
    return err(e);
  }
}

const rethinklib = {
  getConnection,
};

export default rethinklib;
