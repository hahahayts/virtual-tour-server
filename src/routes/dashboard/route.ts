import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import { dashboardRoute } from "./index.js";
import { dashboardHandler } from "./handler.js";

const dashboardRoutes = configureOpenApiApp().openapi(
  dashboardRoute,
  dashboardHandler
);

export default dashboardRoutes;
