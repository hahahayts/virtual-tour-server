import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import {
  CreateWaterTransportationSchema,
  UpdateWaterTransportationSchema,
  WaterTransportationListSchema,
  WaterTransportationSchema,
} from "@/schema/water-transportation/index.js";
import { createRoute } from "@hono/zod-openapi";

const tags = ["Water Transportations"];

export const getWaterTransportationsRoute = createRoute({
  method: "get",
  path: "/water-transportations",
  tags,
  description: "Retrieve a list of all water transportations",
  summary: "Get all water transportations",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: WaterTransportationListSchema,
        },
      },
      description: "List of water transportations",
    },
  },
});

export const getWaterTransportationRoute = createRoute({
  method: "get",
  path: "/water-transportations/{id}",
  tags,
  description: "Retrieve a specific water transportation by ID",
  summary: "Get water transportation by ID",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: WaterTransportationSchema,
        },
      },
      description: "Water transportation details",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Water transportation not found.",
    },
  },
});

export const createWaterTransporatationRoute = createRoute({
  method: "post",
  path: "/water-transportations",
  tags,
  description: "Create a new water transportation",
  summary: "Create water transportation",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateWaterTransportationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: WaterTransportationSchema,
        },
      },
      description: "Water transportation created successfully",
    },
  },
});

export const updateWaterTransportationRoute = createRoute({
  method: "patch",
  path: "/water-transportations/{id}",
  tags,
  description: "Update an existing water transportation",
  summary: "Update water transportation",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateWaterTransportationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: WaterTransportationSchema,
        },
      },
      description: "Water transportation updated successfully",
    },
    400: {
      description: "Bad request, no data provided for update",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Accommodation not found",
    },

    500: {
      description: "Internal server error",
    },
  },
});

export const removeWaterTransportationRoute = createRoute({
  method: "delete",
  path: "/water-transportations/{id}",
  description: "Delete an water transportation by ID",
  summary: "Delete water transportation",
  tags,
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Accommodation deleted successfully",
    },
  },
});

export type GetWaterTransportationsRoute = typeof getWaterTransportationsRoute;
export type GetWaterTransportationRoute = typeof getWaterTransportationRoute;
export type CreateWaterTransportationRoute =
  typeof createWaterTransporatationRoute;
export type UpdateWaterTransportationRoute =
  typeof updateWaterTransportationRoute;
export type RemoveWaterTransportationRoute =
  typeof removeWaterTransportationRoute;
