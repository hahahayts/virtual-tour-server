import { z } from "@hono/zod-openapi";

export const DashboardData = z.object({
  destinations: z.number().int(),
  accommodations: z.number().int(),
  history: z.number().int(),
  restaurnant: z.number().int(),
  land_transportation: z.number().int(),
  water_transportation: z.number().int(),
});
