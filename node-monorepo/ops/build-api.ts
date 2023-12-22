import context from "@atelier/core/context";
import { logError, logInfo } from "@atelier/shared/logger";
import esbuild, { BuildOptions, Loader } from "esbuild";

const options: BuildOptions = {
  entryPoints: ["src/api/index.ts"],
  bundle: true,
  outfile: "dist/api/index.js",
  platform: "node",
  minify: true,
  target: "node18",
  loader: { ".ts": "ts" as Loader },
};

function setup(): void {
  esbuild
    .build(options)
    .catch(() => {
      logError(
        context.Background(),
        "setup",
        new Error("Failed to build db setup")
      );

      process.exit(1);
    })
    .then(() => {
      logInfo(context.Background(), "setup", { message: "Build complete" });
    });
}

setup();
