import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createLandTransportationHandler,
  getLandTransportationHandler,
  getLandTransportationsHandler,
  removeLandTransportationHandler,
  updateLandTransportationHandler,
} from "./handler.js";
import {
  createLandTransporatationRoute,
  getLandTransportationRoute,
  getLandTransportationsRoute,
  removeLandTransportationRoute,
  updateLandTransportationRoute,
} from "./index.js";

const landTransportationRoutes = configureOpenApiApp()
  .openapi(getLandTransportationsRoute, getLandTransportationsHandler)
  .openapi(getLandTransportationRoute, getLandTransportationHandler)
  .openapi(createLandTransporatationRoute, createLandTransportationHandler)
  .openapi(updateLandTransportationRoute, updateLandTransportationHandler)
  .openapi(removeLandTransportationRoute, removeLandTransportationHandler);

export default landTransportationRoutes;
