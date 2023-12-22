import { build } from "vite";

import options from "./config";

(async () => {
  await build(options);
})();
