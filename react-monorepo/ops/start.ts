/* @ts-ignore */
import { createServer } from "vite";
import options from "./config";

(async () => {
  const server = await createServer(options);

  await server.listen();
  server.printUrls();
})();
