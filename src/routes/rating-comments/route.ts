import configureOpenApiApp from "@/lib/configure-open-api-app.js";
import {
  createRatingRoute,
  getRatingsByDestinationIdRoute,
  getRatingsRoute,
  removeRatingRoute,
  updateRatingDisplayRoute,
} from "./index.js";
import {
  createRatingHandler,
  getRatingsByDestinationIdHandler,
  getRatingsHandler,
  removeRatingHandler,
  updateRatingDisplayHandler,
} from "./handler.js";

const ratingRoutes = configureOpenApiApp()
  .openapi(getRatingsRoute, getRatingsHandler)
  .openapi(getRatingsByDestinationIdRoute, getRatingsByDestinationIdHandler)
  .openapi(createRatingRoute, createRatingHandler)
  .openapi(removeRatingRoute, removeRatingHandler)
  .openapi(updateRatingDisplayRoute, updateRatingDisplayHandler); // 🆕

export default ratingRoutes;
