import accommodationRoutes from "./accommodation/route.js";
import { authRoutes } from "./auth/route.js";
import destinationRoutes from "./destination/route.js";
import restaurantRoutes from "./restaurant/route.js";
import taskRoutes from "./task/route.js";
import usersRoute from "./user/routes.js";
import waterTransportationRoutes from "./water-transportation/route.js";

const routes = [
  authRoutes,
  destinationRoutes,
  accommodationRoutes,
  waterTransportationRoutes,
  restaurantRoutes,
  usersRoute,
  taskRoutes,
] as const;

export type Routes = typeof routes;
export default routes;
