import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  changePasswordRoute,
  getMeRoute,
  loginRoute,
  logoutRoute,
  registerRoute,
} from "./index.js";
import {
  changePasswordHandler,
  getMeHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
} from "./handler.js";

export const authRoutes = configureOpenApiApp()
  .openapi(loginRoute, loginHandler)
  .openapi(registerRoute, registerHandler)
  .openapi(getMeRoute, getMeHandler)
  .openapi(logoutRoute, logoutHandler)
  .openapi(changePasswordRoute, changePasswordHandler); // 👈 Add this
