import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import { getMacAddressRoute } from "./index.js";
import { getMacAddressHandler } from "./handler.js";

const macAddressRoute = configureOpenApiApp().openapi(
  getMacAddressRoute,
  getMacAddressHandler
);

export default macAddressRoute;
