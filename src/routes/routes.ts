import aboutRoutes from "./about/route.js";
import accommodationRoutes from "./accommodation/route.js";
import { authRoutes } from "./auth/route.js";
import commentRoutes from "./rating-comments/route.js";
import dashboardRoutes from "./dashboard/route.js";
import destinationRoutes from "./destination/route.js";
import macAddressRoute from "./get-address/route.js";
import historyRoutes from "./history/route.js";
import landTransportationRoutes from "./land-transportation/route.js";
import restaurantRoutes from "./restaurant/route.js";
import taskRoutes from "./task/route.js";
import usersRoute from "./user/routes.js";
import waterTransportationRoutes from "./water-transportation/route.js";

const routes = [
  authRoutes,
  destinationRoutes,
  accommodationRoutes,
  waterTransportationRoutes,
  landTransportationRoutes,
  restaurantRoutes,
  historyRoutes,
  aboutRoutes,
  usersRoute,
  taskRoutes,
  dashboardRoutes,
  macAddressRoute,
  commentRoutes,
] as const;

export type Routes = typeof routes;
export default routes;
