import { IdParamsSchema } from "@/schema/id-params.js";
import {
  CreateLandTransportationSchema,
  LandTransportationListSchema,
  LandTransportationSchema,
  UpdateLandTransportationSchema,
} from "@/schema/land-transportation/index.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import { createRoute } from "@hono/zod-openapi";

const tags = ["Land Transporations"];

export const getLandTransportationsRoute = createRoute({
  method: "get",
  path: "/land-transportations",
  tags,
  description: "Retrieve a list of all land transportations",
  summary: "Get all land transportations",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LandTransportationListSchema,
        },
      },
      description: "List of water transportations",
    },
  },
});

export const getLandTransportationRoute = createRoute({
  method: "get",
  path: "/land-transportations/{id}",
  tags,
  description: "Retrieve a specific land transportation by ID",
  summary: "Get land transportation by ID",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LandTransportationSchema,
        },
      },
      description: "Land transportation details",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Land transportation not found.",
    },
  },
});

export const createLandTransporatationRoute = createRoute({
  method: "post",
  path: "/land-transportations",
  tags,
  description: "Create a new land transportation",
  summary: "Create land transportation",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateLandTransportationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LandTransportationSchema,
        },
      },
      description: "Land transportation created successfully",
    },
  },
});

export const updateLandTransportationRoute = createRoute({
  method: "patch",
  path: "/land-transportations/{id}",
  tags,
  description: "Update an existing land transportation",
  summary: "Update land transportation",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateLandTransportationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LandTransportationSchema,
        },
      },
      description: "Land transportation updated successfully",
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
      description: "Land transportation not found",
    },

    500: {
      description: "Internal server error",
    },
  },
});

export const removeLandTransportationRoute = createRoute({
  method: "delete",
  path: "/land-transportations/{id}",
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

export type GetLandTransportationsRoute = typeof getLandTransportationsRoute;
export type GetLandTransportationRoute = typeof getLandTransportationRoute;
export type CreateLandTransportationRoute =
  typeof createLandTransporatationRoute;
export type UpdateLandTransportation = typeof updateLandTransportationRoute;
export type RemoveLandTransportation = typeof removeLandTransportationRoute;
