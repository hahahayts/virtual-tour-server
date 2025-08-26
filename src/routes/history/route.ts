import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createHistoryRoute,
  getHistoriesRoute,
  getHistoryRoute,
  removeHistoryRoute,
  updateHistoryRoute,
} from "./index.js";
import {
  createHistoryHandler,
  getHistoriesHandler,
  getHistoryHandler,
  removeHistoryHandler,
  updateHistoryHandler,
} from "./handler.js";

const historyRoutes = configureOpenApiApp()
  .openapi(getHistoriesRoute, getHistoriesHandler)
  .openapi(getHistoryRoute, getHistoryHandler)
  .openapi(createHistoryRoute, createHistoryHandler)
  .openapi(updateHistoryRoute, updateHistoryHandler)
  .openapi(removeHistoryRoute, removeHistoryHandler);

export default historyRoutes;
