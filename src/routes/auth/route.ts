import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import { getMeRoute, loginRoute, logoutRoute, registerRoute } from "./index.js";
import {
  getMeHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
} from "./handler.js";

export const authRoutes = configureOpenApiApp()
  .openapi(loginRoute, loginHandler)
  .openapi(registerRoute, registerHandler)
  .openapi(getMeRoute, getMeHandler)
  .openapi(logoutRoute, logoutHandler);
