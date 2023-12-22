import rethinklib from ".";
import { r, Connection } from "rethinkdb-ts";
import context, { Context } from "../../core/context";
import { err, ok, Result } from "neverthrow";
import { ConsoleLogger } from "../logger/console";
import { LogLevel } from "../logger";

const logger = new ConsoleLogger();

const log = logger.log;

const databaseName = "rappi-demo";

const tables = ["messages"];

async function createTable(
  ctx: Context,
  table: string,
  conn: Connection
): Promise<Result<void, Error>> {
  const db = r.db(databaseName);
  const result = await db.tableList().run(conn);
  if (result.includes(table)) {
    log(ctx, {
      level: LogLevel.Info,
      event: "rethinkdb.setup",
      data: { message: `Table ${table} already exists` },
    });

    return ok(undefined);
  }

  try {
    log(ctx, {
      level: LogLevel.Info,
      event: "rethinkdb.setup",
      data: { message: `Creating table ${table}` },
    });

    await db.tableCreate(table, { primaryKey: "id" }).run(conn);

    return ok(undefined);
  } catch (e) {
    return err(e);
  }
}

async function createTables(
  ctx: Context,
  tables: Array<string>,
  conn: Connection
): Promise<Result<void, Error>> {
  for (const table of tables) {
    const result = await createTable(ctx, table, conn);
    if (result.isErr()) {
      return err(result.error);
    }
  }

  return ok(undefined);
}

async function setup(ctx: Context): Promise<Result<void, Error>> {
  const conn = await rethinklib.getConnection(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  const contains = await r.dbList().contains(databaseName).run(conn.value);
  if (!contains) {
    try {
      log(ctx, {
        level: LogLevel.Info,
        event: "rethinkdb.setup",
        data: { message: `Creating database ${databaseName}` },
      });

      await r.dbCreate(databaseName).run(conn.value);
    } catch (e) {
      return err(e);
    }
  } else {
    log(ctx, {
      level: LogLevel.Info,
      event: "rethinkdb.setup",
      data: { message: `Database ${databaseName} already exists` },
    });
  }

  const result = await createTables(ctx, tables, conn.value);
  if (result.isErr()) {
    return err(result.error);
  }

  return ok(undefined);
}

async function setDown(): Promise<Result<void, Error>> {
  const conn = await rethinklib.getConnection(context.Background());
  if (conn.isErr()) {
    return err(conn.error);
  }

  const contains = await r.dbList().contains(databaseName).run(conn.value);
  if (!contains) {
    log(context.Background(), {
      level: LogLevel.Info,
      event: "rethinkdb.setup",
      data: { message: `Database ${databaseName} does not exist` },
    });

    return ok(undefined);
  }

  try {
    log(context.Background(), {
      level: LogLevel.Info,
      event: "rethinkdb.setup",
      data: { message: `Deleting database ${databaseName}` },
    });

    await r.dbDrop(databaseName).run(conn.value);
  } catch (e) {
    return err(e);
  }

  return ok(undefined);
}

const lib = {
  setup,
  setDown,
};

export default lib;
