import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

export default function configureOpenApiApp() {
  const app = new OpenAPIHono();

  app.use("/doc", prettyJSON());
  app.use("*", logger());
  app.use(
    "*",
    cors({
      origin: ["http://localhost:5173"],
      allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  );
  app.onError((err, c) => {
    console.error(`${err}`);
    return c.text("Custom Error Message", 500);
  });

  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API",
    },
  });

  app.use("/reference", Scalar({ url: "/doc", theme: "kepler" }));

  return app;
}
