import { err, ok, Result } from "neverthrow";
import { r } from "rethinkdb-ts";

import { Context } from "@atelier/core/context";
import rethinklib from "@atelier/shared/rethinkdb";

import { Message } from "./types";
import time from "@atelier/shared/time";
import { generateID } from "@atelier/shared/crypto";

const table = r.db("rappi-demo").table("messages");

async function $delete(
  ctx: Context,
  input: {
    id: string;
  }
): Promise<Result<{}, Error>> {
  const conn = await rethinklib.getConnection(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  const query = table.get(input.id).delete();
  try {
    await query.run(conn.value);

    return ok({});
  } catch (e) {
    return err(e);
  }
}

async function update(
  ctx: Context,
  input: {
    id: string;
    content: string;
  }
): Promise<Result<{}, Error>> {
  const conn = await rethinklib.getConnection(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  const query = table.get(input.id).update({
    content: input.content,
    updated_at: time.now(),
  });
  try {
    await query.run(conn.value);

    return ok({});
  } catch (e) {
    return err(e);
  }
}

async function list(ctx: Context): Promise<Result<Message[], Error>> {
  const conn = await rethinklib.getConnection(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  let query = table.filter({});

  try {
    const response = await query.orderBy("created_at").run(conn.value);
    return ok(response);
  } catch (e) {
    return err(e);
  }
}

async function create(
  ctx: Context,
  input: {
    content: string;
    from: string;
  }
): Promise<Result<{ id: string; content: string }, Error>> {
  const conn = await rethinklib.getConnection(ctx);
  if (conn.isErr()) {
    return err(conn.error);
  }

  let id = generateID({ length: 10, prefix: "MSG" });
  const query = table.insert({
    id,
    content: input.content,
    from: input.from,
    created_at: time.now(),
    updated_at: time.now(),
  });
  try {
    await query.run(conn.value);

    return ok({
      id,
      content: input.content,
    });
  } catch (e) {
    return err(e);
  }
}

const messagesStore = {
  list,
  create,
  update,
  delete: $delete,
};

export default messagesStore;
