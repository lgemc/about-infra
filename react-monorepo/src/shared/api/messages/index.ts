import { err, ok, Result } from "neverthrow";
import { Context } from "@atelier/core/context/types";
import { Method, Send } from "@atelier/shared/http";

export interface FindMessageInput {
  message_id: string;
}

export async function create(
  ctx: Context,
  input: {
    content: string;
    from?: string;
  }
): Promise<Result<any, Error>> {
  let response = await Send<any>(ctx, {
    method: Method.POST,
    url: `messages`,
    data: input,
  });
  if (response.isErr()) {
    return err(response.error);
  }

  return ok(response.value.data);
}

export async function list(
  ctx: Context
): Promise<Result<{ items: Array<{ id: string; content: string }> }, Error>> {
  let response = await Send<any>(ctx, {
    method: Method.GET,
    url: `messages`,
  });
  if (response.isErr()) {
    return err(response.error);
  }

  return ok(response.value.data);
}

export async function $delete(
  ctx: Context,
  input: FindMessageInput
): Promise<Result<any, Error>> {
  let response = await Send<any>(ctx, {
    method: Method.DELETE,
    url: `messages/${input.message_id}`,
  });
  if (response.isErr()) {
    return err(response.error);
  }

  return ok(response.value.data);
}

export async function update(
  ctx: Context,
  input: {
    message_id: string;
    content: string;
  }
): Promise<Result<any, Error>> {
  let response = await Send<any>(ctx, {
    method: Method.PUT,
    url: `messages/${input.message_id}`,
    data: input,
  });
  if (response.isErr()) {
    return err(response.error);
  }

  return ok(response.value.data);
}

const messagesAPI = {
  list,
  create,
  delete: $delete,
  update,
};

export default messagesAPI;
