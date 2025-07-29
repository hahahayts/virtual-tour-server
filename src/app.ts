import routes from "./routes/routes.js";
import configureOpenApiApp from "./lib/configure-open-api-app.js";

const app = configureOpenApiApp();

routes.forEach((route) => {
  app.route("/api", route);
});
export default app;
