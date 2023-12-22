import { Context } from "@atelier/core/context";
import axios from "./axios";

import { Method } from "./method";
import { err, ok, Result } from "neverthrow";

export interface SendRequest<D = any> {
  url?: string;
  path?: string;
  headers?: { [key: string]: string };
  data?: D;
  disableLogs?: boolean;
  method: Method;
  params?: { [key: string]: string | undefined };
}

export interface SendResponse<D = any> {
  statusCode: number;
  request: SendRequest;
  headers: { [key: string]: string };
  data: D;
}

export interface SendError<D = any> extends Error {
  request: SendRequest;
  response?: SendResponse<D>;
}

export async function Send<D = any, E = any>(
  ctx: Context,
  request: SendRequest
): Promise<Result<SendResponse<D>, SendError<E>>> {
  try {
    const response = await axios.request({
      url: request.url,
      data: request.data,
      method: request.method,
      headers: request.headers,
      params: request.params,
    });

    return ok({
      statusCode: response.status,
      request,
      data: response.data,
      headers: response.headers as any,
    });
  } catch (e) {
    return err({
      request,
      message: e.message,
      name: e.name,
      response: e.response,
      stack: e.stack,
    });
  }
}

const lib = {
  Send,
};

export default lib;
