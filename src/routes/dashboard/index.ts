import { createRoute } from "@hono/zod-openapi";
import { DashboardData } from "./schema.js";
const tags = ["Dashboard Data"];

export const dashboardRoute = createRoute({
  method: "get",
  path: "/dashboard",
  tags,
  description: "Get all data lenghts",
  summary: "Get all data lengths",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DashboardData,
        },
      },
      description: "Get all data lenghts",
    },
  },
});

export type DashboardRoute = typeof dashboardRoute;
