import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createAccommodationRoute,
  getAccommodationRoute,
  getAccommodationsRoute,
  removeAccommodationRoute,
  updateAccommodationRoute,
} from "./index.js";
import {
  createAccommodationHandler,
  getAccommodationHandler,
  getAccommodationsHandler,
  removeAccommodationHandler,
  updateAccommodationHandler,
} from "./handler.js";

const accommodationRoutes = configureOpenApiApp()
  .openapi(getAccommodationsRoute, getAccommodationsHandler)
  .openapi(getAccommodationRoute, getAccommodationHandler)
  .openapi(createAccommodationRoute, createAccommodationHandler)
  .openapi(updateAccommodationRoute, updateAccommodationHandler)
  .openapi(removeAccommodationRoute, removeAccommodationHandler);

export default accommodationRoutes;
