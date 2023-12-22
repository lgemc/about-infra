import { Context } from "@atelier/core/context";
import rethikdbLib from "@atelier/shared/rethinkdb";
import EventEmitter from "events";
import { err, ok, Result } from "neverthrow";
import { r, RDatabase } from "rethinkdb-ts";
import { Events } from "./types";

class DatabaseEmitter extends EventEmitter {
  private db: RDatabase;
  private _started: boolean;
  private watchedTables: string[];

  constructor() {
    super();
    this.db = r.db("rappi-demo");

    this._started = false;

    this.watchedTables = ["messages"];
  }

  started(): boolean {
    return this._started;
  }

  async setup(ctx: Context): Promise<Result<DatabaseEmitter, Error>> {
    if (this._started) {
      return ok(undefined);
    }

    const conn = await rethikdbLib.getConnection(ctx);
    if (conn.isErr()) {
      return err(conn.error);
    }
    try {
      for (const table of this.watchedTables) {
        this.subscribe(ctx, { table });
      }

      this._started = true;
      return ok(this);
    } catch (e) {
      return err(e);
    }
  }

  private async subscribe(
    ctx: Context,
    input: { table: string }
  ): Promise<Result<void, Error>> {
    const conn = await rethikdbLib.getConnection(ctx);
    if (conn.isErr()) {
      return err(conn.error);
    }

    try {
      this.db
        .table(input.table)
        .changes()
        .run(conn.value)
        .then((cursor) => {
          cursor.each((err, change) => {
            if (err) {
              this.emit(Events.ERROR, err);

              return;
            }

            this.emit(Events.DATA, { topic: input.table, change });
          });
        });

      return ok(undefined);
    } catch (e) {
      return err(e);
    }
  }
}

export default DatabaseEmitter;
