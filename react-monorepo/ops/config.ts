/* @ts-ignore */
import { InlineConfig } from "vite";
/* @ts-ignore */
import { build } from "vite";

import react from "@vitejs/plugin-react";

import envCompatible from "vite-plugin-env-compatible";
import tsconfigPaths from "vite-tsconfig-paths";

const options: InlineConfig = {
  root: `./`,
  envPrefix: "REACT_APP_",
  plugins: [react(), envCompatible(), tsconfigPaths()],
  server: {
    port: 8081,
    open: true,
    host: true,
  },
};

export default options;
