import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import { getUserRoute, getUsersRoute } from "./index.js";
import { getUserHandler, getUsersHandler } from "./handler.js";

const usersRoute = configureOpenApiApp()
  .openapi(getUsersRoute, getUsersHandler)
  .openapi(getUserRoute, getUserHandler);

export default usersRoute;
