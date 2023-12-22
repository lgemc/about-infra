import { ParameterizedContext } from "koa";
import vary from "vary";

interface Options {
  exposeHeaders?: string | string[];
  allowMethods?: string | string[];
  allowHeaders?: string | string[];
  credentials?: boolean | ((ctx: ParameterizedContext) => void);
  maxAge?: number | string;
  keepHeadersOnError?: boolean;
  privateNetworkAccess?: boolean;
  secureContext?: boolean;
  origin: string | ((ctx: ParameterizedContext) => void);
}

/**
 * CORS middleware
 */
function cors(options: Options) {
  const defaults = {
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    secureContext: false,
  };

  options = {
    ...defaults,
    ...options,
  };

  if (Array.isArray(options.exposeHeaders)) {
    options.exposeHeaders = options.exposeHeaders.join(",");
  }

  if (Array.isArray(options.allowMethods)) {
    options.allowMethods = options.allowMethods.join(",");
  }

  if (Array.isArray(options.allowHeaders)) {
    options.allowHeaders = options.allowHeaders.join(",");
  }

  if (options.maxAge) {
    options.maxAge = String(options.maxAge);
  }

  options.keepHeadersOnError =
    options.keepHeadersOnError === undefined || !!options.keepHeadersOnError;

  return async function cors(ctx: ParameterizedContext, next) {
    // If the Origin header is not present terminate this set of steps.
    // The request is outside the scope of this specification.
    const requestOrigin = ctx.get("Origin");

    // Always set Vary header
    // https://github.com/rs/cors/issues/10
    ctx.vary("Origin");

    let origin;
    if (typeof options.origin === "function") {
      origin = await options.origin(ctx);
      if (!origin) return await next();
    } else {
      origin = options.origin || requestOrigin;
    }

    let credentials;
    if (typeof options.credentials === "function") {
      credentials = await options.credentials(ctx);
    } else {
      credentials = !!options.credentials;
    }

    if (credentials && origin === "*") {
      origin = requestOrigin;
    }

    const headersSet = {};

    function set(key, value) {
      ctx.set(key, value);
      headersSet[key] = value;
    }

    if (ctx.method !== "OPTIONS") {
      // Simple Cross-Origin Request, Actual Request, and Redirects
      set("Access-Control-Allow-Origin", origin);

      if (credentials === true) {
        set("Access-Control-Allow-Credentials", "true");
      }

      if (options.exposeHeaders) {
        set("Access-Control-Expose-Headers", options.exposeHeaders);
      }

      if (options.secureContext) {
        set("Cross-Origin-Opener-Policy", "same-origin");
        set("Cross-Origin-Embedder-Policy", "require-corp");
      }

      if (!options.keepHeadersOnError) {
        return await next();
      }
      try {
        return await next();
      } catch (err) {
        const errHeadersSet = err.headers || {};
        const varyWithOrigin = vary.append(
          errHeadersSet.vary || errHeadersSet.Vary || "",
          "Origin"
        );
        delete errHeadersSet.Vary;

        err.headers = {
          ...errHeadersSet,
          ...headersSet,
          ...{ vary: varyWithOrigin },
        };
        throw err;
      }
    } else {
      // Preflight Request

      // If there is no Access-Control-Request-Method header or if parsing failed,
      // do not set any additional headers and terminate this set of steps.
      // The request is outside the scope of this specification.
      if (!ctx.get("Access-Control-Request-Method")) {
        // this not preflight request, ignore it
        return await next();
      }

      ctx.set("Access-Control-Allow-Origin", origin);

      if (credentials === true) {
        ctx.set("Access-Control-Allow-Credentials", "true");
      }

      if (options.maxAge) {
        ctx.set("Access-Control-Max-Age", String(options.maxAge));
      }

      if (
        options.privateNetworkAccess &&
        ctx.get("Access-Control-Request-Private-Network")
      ) {
        ctx.set("Access-Control-Allow-Private-Network", "true");
      }

      if (options.allowMethods) {
        ctx.set("Access-Control-Allow-Methods", options.allowMethods);
      }

      if (options.secureContext) {
        set("Cross-Origin-Opener-Policy", "same-origin");
        set("Cross-Origin-Embedder-Policy", "require-corp");
      }

      let allowHeaders = options.allowHeaders;
      if (!allowHeaders) {
        allowHeaders = ctx.get("Access-Control-Request-Headers");
      }
      if (allowHeaders) {
        ctx.set("Access-Control-Allow-Headers", allowHeaders);
      }
      ctx.status = 204;
    }
  };
}

export default cors;