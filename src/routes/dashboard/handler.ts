import type { AppRouteHandler } from "@/schema/route-handler.js";
import type { DashboardRoute } from "./index.js";
import { prisma } from "@/lib/prisma.js";

export const dashboardHandler: AppRouteHandler<DashboardRoute> = async (c) => {
  const data = await prisma.$transaction(async (tx) => {
    const destination_count = await tx.destination.findMany();
    const accommodation_count = await tx.accommodation.findMany();
    const history_count = await tx.history.findMany();
    const restaurnant_count = await tx.restaurant.findMany();
    const land_transportation_count = await tx.landTransportation.findMany();
    const water_transportation_count = await tx.waterTransportation.findMany();

    return {
      destinations: destination_count.length,
      accommodations: accommodation_count.length,
      history: history_count.length,
      restaurnant: restaurnant_count.length,
      land_transportation: land_transportation_count.length,
      water_transportation: water_transportation_count.length,
    };
  });

  return c.json(data, 200);
};
