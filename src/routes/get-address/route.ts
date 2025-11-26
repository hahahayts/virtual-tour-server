import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import { getDestinationVisitStatsRoute, getMacAddressRoute } from "./index.js";
import {
  getDestinationVisitStatsHandler,
  getMacAddressHandler,
} from "./handler.js";  

const macAddressRoute = configureOpenApiApp()
  .openapi(getMacAddressRoute, getMacAddressHandler)
  .openapi(getDestinationVisitStatsRoute, getDestinationVisitStatsHandler);

export default macAddressRoute;
