import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createDestinationHandler,
  getDestinationHandler,
  getDestinationsHandler,
  removeDestinationHandler,
  updateDestinationHandler,
} from "./handler.js";
import {
  createDestinationRoute,
  getDestinationRoute,
  getDestinationsRoute,
  removeDestinationRoute,
  updateDestinationRoute,
} from "./index.js";

const destinationRoutes = configureOpenApiApp()
  .openapi(getDestinationsRoute, getDestinationsHandler)
  .openapi(getDestinationRoute, getDestinationHandler)
  .openapi(createDestinationRoute, createDestinationHandler)
  .openapi(updateDestinationRoute, updateDestinationHandler)
  .openapi(removeDestinationRoute, removeDestinationHandler);

export default destinationRoutes;
