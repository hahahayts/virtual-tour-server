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

export type GetMacAddressRoute = typeof getMacAddressRoute;
