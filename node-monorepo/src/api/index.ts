import Koa, { ParameterizedContext } from "koa";
import { koaBody } from "koa-body";

import env, { Vars } from "@atelier/shared/env";
import errorCatcher from "@api/middlwares/error-catcher";

import { Background } from "@atelier/core/context";
import koalib from "../shared/koa/lib";
import cors from "@atelier/shared/koa/middlewares/cors";
import { Method, Status } from "@atelier/shared/http";
import { logInfo } from "@atelier/shared/logger";
import router from "./routes";
const DEFAULT_PORT = 1337;

const app = new Koa();

app.use(errorCatcher);

app.use(koaBody());

const allowAllOriginsPathsPrefix = ["/api/optin", "/api/integrations/shopify"];

app.use(
  cors({
    origin: (ctx: ParameterizedContext) => {
      const requestOrigin = ctx.get("Origin");

      if (ctx.request.method !== Method.OPTIONS) {
        return requestOrigin;
      }

      for (let prefix of allowAllOriginsPathsPrefix) {
        if (ctx.request.path.startsWith(prefix)) {
          return requestOrigin;
        }
      }

      const allowedHosts = env.string(Vars.ALLOWED_HOSTS);
      if (allowedHosts) {
        const hosts = allowedHosts.split(",");
        for (let h of hosts) {
          if (h === requestOrigin) {
            return requestOrigin;
          }
        }
      }

      return ""; // do not allow origin
    },
  })
);

app.use(async (ctx: ParameterizedContext, next) => {
  logInfo(koalib.getContext(ctx), "request_received", {
    path: ctx.path,
    method: ctx.method,
    body: ctx.body,
    headers: ctx.headers,
  });

  await next();

  if (ctx.status !== Status.Ok) {
    logInfo(koalib.getContext(ctx), "non_ok_response_returned", {
      path: ctx.path,
      method: ctx.method,
      status: ctx.status,
    });
  }
});

app.use(async (ctx, next) => {
  koalib.setContext(ctx, Background());
  await next();
});

app.use(router.routes());

app.listen(env.number(Vars.PORT, DEFAULT_PORT).unwrapOr(DEFAULT_PORT), () => {
  logInfo(Background(), "server_started", {
    port: env.number(Vars.PORT, DEFAULT_PORT).unwrapOr(DEFAULT_PORT),
  });
});
