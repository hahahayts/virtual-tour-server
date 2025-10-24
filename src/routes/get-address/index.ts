import { createRoute, z } from "@hono/zod-openapi";

const tags = ["Mac Address"];

export const getMacAddressRoute = createRoute({
  method: "get",
  path: "/get-mac-address",
  tags,
  description: "Get MAC Address of the requester",
  summary: "Retrieve MAC Address",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            mac_address: z.string().min(1).max(17),
          }),
        },
      },
      description: "MAC Address retrieved successfully",
    },
  },
});

export type GetMacAddressRoute = typeof getMacAddressRoute;
