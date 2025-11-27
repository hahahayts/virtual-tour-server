import { createRoute, z } from "@hono/zod-openapi";

const tags = ["Mac Address"];

const chartDataSchema = z.object({
  month: z.string(),
  visited: z.number(),
});

export const getMacAddressRoute = createRoute({
  method: "get",
  path: "/get-mac-address",
  tags,
  description: "Get MAC Address and aggregated monthly visits",
  summary: "Retrieve MAC Address and visit statistics",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            mac_address: z.string().min(1).max(17),
            message: z.string(),
            chartData: z.array(chartDataSchema),
          }),
        },
      },
      description: "MAC Address retrieved and chart data returned",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({
            error: z.string(),
          }),
        },
      },
      description: "Internal Server Error",
    },
  },
});

export const getDestinationVisitStatsRoute = createRoute({
  method: "get",
  path: "/destination-visit-stats/{destinationId}",
  tags,
  description: "Get monthly visit stats for a destination", 
  summary: "Retrieve destination visit statistics",
  request: {
    params: z.object({
      destinationId: z.string().min(1).describe("Destination ID"),
    }),
  },
  responses: {
    200: {
      description: "Destination visit stats retrieved",
      content: {
        "application/json": {
          schema: z.object({
            chartData: z.array(
              z.object({
                month: z.string(),
                visited: z.number(),
              })
            ),
          }),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() }),
        },
      },
    },
  },
});

export type GetDestinationVisitStatsRoute =
  typeof getDestinationVisitStatsRoute;

export type GetMacAddressRoute = typeof getMacAddressRoute;
