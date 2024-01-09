import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

import tailwindConfig from "./tailwind.config";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./cmd/web",
  css: {
    postcss: {
      plugins: [
        tailwindcss(tailwindConfig),
        require("postcss-minify"),
        require("autoprefixer"),
      ],
    },
  },
  envPrefix: "REACT_APP_",
  plugins: [react(), tsconfigPaths()],
});
