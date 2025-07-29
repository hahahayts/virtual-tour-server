import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createRestaurantRoute,
  getRestaurantRoute,
  getRestaurantsRoute,
  removeRestaurantRoute,
  updateRestaurantRoute,
} from "./index.js";
import {
  createRestaurantHandler,
  getRestaurantHandler,
  getRestaurantsHandler,
  removeRestaurantHandler,
  updateRestaurantHandler,
} from "./handler.js";

const restaurantRoutes = configureOpenApiApp()
  .openapi(getRestaurantsRoute, getRestaurantsHandler)
  .openapi(getRestaurantRoute, getRestaurantHandler)
  .openapi(createRestaurantRoute, createRestaurantHandler)
  .openapi(updateRestaurantRoute, updateRestaurantHandler)
  .openapi(removeRestaurantRoute, removeRestaurantHandler);

export default restaurantRoutes;
