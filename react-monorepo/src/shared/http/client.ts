import { AxiosError } from "axios";

import { Context, ContextKeys } from "@atelier/core/context/types";
import axios from "./axios";

import { log, LogLevel } from "../logger";
import { Method } from "./method";
import { err, ok, Result } from "neverthrow";
import { Headers } from "./headers";

type Map = { [key: string]: string | undefined };
export interface SendRequest<D = any> {
  url?: string;
  headers?: Map;
  data?: D;
  disableLogs?: boolean;
  method: Method;
  params?: Map;
}

export interface SendResponse<D = any> {
  statusCode: number;
  request: SendRequest;
  data: D;
}

// allow authorization customization via context
//
// Why?
// Some times we have no way to inject jwt via local storage
// or cookies, as cases where app is embed into another site,
// on this cases, context is used to envelop authorization tokens
function ensureHeaders(ctx: Context, headers?: Map): Map {
  if (!headers) {
    headers = {};
  }

  if (ctx.Value(ContextKeys.BearerToken)) {
    headers = {
      [Headers.Authorization]: `Bearer ${ctx.Value(ContextKeys.BearerToken)}`,
    };
  }

  return headers;
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
      headers: ensureHeaders(ctx, request.headers),
      params: request.params,
    });

    return ok({ statusCode: response.status, request, data: response.data });
  } catch (e) {
    if (!request.disableLogs) {
      logError(ctx, e as any);
    } else {
      console.log(JSON.stringify(e));
    }

    const error = e as AxiosError;
    return err({
      request,
      message: error.message,
      name: error.name,
      response: error.response,
      stack: error.stack,
    } as any);
  }
}

function logError(ctx: Context, error: AxiosError) {
  if (!error.response?.data) {
    log(ctx, {
      event: "http_request_failed",
      level: LogLevel.Critical,
      data: {
        message: error.message,
        name: error.name,
      },
    });

    return new Error("unexpected http error arrived");
  }

  let data: any = {
    code: error.code,
    name: error.name,
    message: error.message,
  };
  if (error.request) {
    data.host = error.request.host;
    data.path = error.request.path;
    data.url = error.request.url;
  }
  const errorData: any = error.response.data;
  if (errorData["error"]) {
    data = { ...data, ...errorData["error"] };
  } else {
    data = { ...data, errorData };
  }
  if (errorData["details"] && Array.isArray(errorData["details"]["errors"])) {
    errorData["details"]["errors"].map((e) => logError(ctx, e));
  }

  log(ctx, {
    event: "http_request_failed",
    level: LogLevel.Error,
    data,
  });
}

const client = {
  Send,
};
export default client;
