import Koa, { ParameterizedContext } from "koa";
import IO from "koa-socket-2";
import { Socket } from "socket.io";

import env, { Vars } from "@atelier/shared/env";
import errorCatcher from "@api/middlwares/error-catcher";
import context from "@atelier/core/context";
import arrayLib from "@atelier/shared/arrays";
import subscribeToDatabase from "./io/handlers";
import cors from "@atelier/shared/koa/middlewares/cors";
import { Method } from "@atelier/shared/http";
import { logInfo } from "@atelier/shared/logger";

const DEFAULT_PORT = 1338;

const app = new Koa();

const room = "rappi-demo";

app.use(
  cors({
    origin: (ctx: ParameterizedContext) => {
      const requestOrigin = ctx.get("Origin");

      if (ctx.request.method !== Method.OPTIONS) {
        return requestOrigin;
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

const io = new IO({
  ioOptions: {
    cors: {
      origin: function (origin, callback) {
        if (arrayLib.in(env.string(Vars.ALLOWED_HOSTS).split(","), origin)) {
          callback(null, true);

          return;
        }

        callback(new Error("host not allowed"));
      },
    },
  },
});

io.attach(app);

io.on("connection", (socket: Socket) => {
  logInfo(context.Background(), "socket_connected", {
    id: socket.id,
  });

  socket.on("disconnect", () => {
    logInfo(context.Background(), "socket_disconnected", {
      id: socket.id,
    });
  });

  socket.on("error", (e) => {
    logInfo(context.Background(), "socket_error", {
      id: socket.id,
      error: e,
    });
  });

  socket.join(room);
});

subscribeToDatabase(context.Background(), { io });

app.use(errorCatcher);

const port = env
  .number(Vars.ATELIER_SOCKETS_PORT, DEFAULT_PORT)
  .unwrapOr(DEFAULT_PORT);

app.listen(port, () => {
  logInfo(context.Background(), "socket_server_started", {
    port,
  });
});
