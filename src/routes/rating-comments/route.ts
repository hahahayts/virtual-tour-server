import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createRatingRoute,
  getRatingsRoute,
  removeRatingRoute,
} from "./index.js";
import {
  createRatingHandler,
  getRatingsHandler,
  removeRatingHandler,
} from "./handler.js";

const ratingRoutes = configureOpenApiApp()
  .openapi(getRatingsRoute, getRatingsHandler)
  .openapi(createRatingRoute, createRatingHandler)
  .openapi(removeRatingRoute, removeRatingHandler);

export default ratingRoutes;
