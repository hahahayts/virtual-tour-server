import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createWaterTransporatationRoute,
  getWaterTransportationRoute,
  getWaterTransportationsRoute,
  removeWaterTransportationRoute,
  updateWaterTransportationRoute,
} from "./index.js";
import {
  createWaterTransportationHandler,
  getWaterTransportationHandler,
  getWaterTransportationsHandler,
  removeWaterTransportationHandler,
  updateWaterTransportationHandler,
} from "./handler.js";

const waterTransportationRoutes = configureOpenApiApp()
  .openapi(getWaterTransportationsRoute, getWaterTransportationsHandler)
  .openapi(getWaterTransportationRoute, getWaterTransportationHandler)
  .openapi(createWaterTransporatationRoute, createWaterTransportationHandler)
  .openapi(updateWaterTransportationRoute, updateWaterTransportationHandler)
  .openapi(removeWaterTransportationRoute, removeWaterTransportationHandler);

export default waterTransportationRoutes;
