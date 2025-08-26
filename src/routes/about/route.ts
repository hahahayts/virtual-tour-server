import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createAboutRoute,
  getAboutRoute,
  removeAboutRoute,
  updateAboutRoute,
} from "./index.js";
import {
  createAboutHandler,
  getAboutHandler,
  removeAboutHandler,
  updateAboutHandler,
} from "./handler.js";

const aboutRoutes = configureOpenApiApp()
  .openapi(getAboutRoute, getAboutHandler)
  .openapi(createAboutRoute, createAboutHandler)
  .openapi(updateAboutRoute, updateAboutHandler)
  .openapi(removeAboutRoute, removeAboutHandler);

export default aboutRoutes;
