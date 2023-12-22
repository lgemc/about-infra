import Router from "@koa/router";

import { InternalServerError } from "@atelier/api/errors/lib";
import store from "@atelier/core/messages/store";
import { Status } from "@atelier/shared/http";
import { logError } from "@atelier/shared/logger";
import koalib from "@atelier/shared/koa/lib";
import { ParameterizedContext } from "koa";

const messages = new Router();

messages.get("/", async (ctx: ParameterizedContext) => {
  const result = await store.list(koalib.getContext(ctx));
  if (result.isErr()) {
    logError(koalib.getContext(ctx), "find_failed", result.error);

    ctx.response.body = InternalServerError;
    ctx.status = Status.InternalServerError;

    return;
  }

  ctx.response.body = { items: result.value };
  ctx.response.status = Status.Ok;
});

messages.post("/", async (ctx) => {
  const result = await store.create(koalib.getContext(ctx), ctx.request.body);
  if (result.isErr()) {
    logError(koalib.getContext(ctx), "create_failed", result.error);

    ctx.response.body = InternalServerError;
    ctx.status = Status.InternalServerError;

    return;
  }

  ctx.response.body = result.value;
  ctx.response.status = Status.Ok;
});

messages.put("/:id", async (ctx) => {
  const result = await store.update(koalib.getContext(ctx), {
    id: ctx.params.id,
    content: ctx.request.body.content,
  });
  if (result.isErr()) {
    logError(koalib.getContext(ctx), "update_failed", result.error);

    ctx.response.body = InternalServerError;
    ctx.status = Status.InternalServerError;

    return;
  }

  ctx.response.body = result.value;
  ctx.response.status = Status.Ok;
});

messages.delete("/:id", async (ctx) => {
  const result = await store.delete(koalib.getContext(ctx), {
    id: ctx.params.id,
  });
  if (result.isErr()) {
    logError(koalib.getContext(ctx), "delete_failed", result.error);

    ctx.response.body = InternalServerError;
    ctx.status = Status.InternalServerError;

    return;
  }

  ctx.response.body = result.value;
  ctx.response.status = Status.Ok;
});

export default messages;
