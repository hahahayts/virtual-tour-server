import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import { getUsersRoute } from "./index.js";
import { getUsersHandler } from "./handler.js";

const usersRoute = configureOpenApiApp().openapi(
  getUsersRoute,
  getUsersHandler
);

export default usersRoute;
