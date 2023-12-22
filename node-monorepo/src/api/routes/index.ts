import Router from "@koa/router";

import messages from "./messages";

const routes = new Router();

routes.get("/", async (ctx) => {
  ctx.body = "Hello World";
});

routes.use("/messages", messages.routes());

const index = new Router();
index.use("/api", routes.routes());

export default index;
