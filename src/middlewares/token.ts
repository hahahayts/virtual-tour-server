import { envConfig } from "@/env.js";
import type { MiddlewareHandler } from "hono";

const JWTMiddleware: MiddlewareHandler = async (c, next) => {
  const token = c.req.header("Authorization")?.split(" ")[1] || "";

  if (token !== envConfig.JWT_ACCESS_SECRET)
    return c.json({ message: "Unauthorized" }, 401);

  console.log("Bearer: ", token);

  await next();
};

export default JWTMiddleware;
