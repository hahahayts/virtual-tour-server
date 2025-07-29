import {
  AccommodationListSchema,
  AccomodationSchema,
  CreateAccommodationSchema,
  UpdateAccommodationSchema,
} from "@/schema/accommodation/index.js";
import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import { createRoute } from "@hono/zod-openapi";

const tags = ["Accommodation"];

export const getAccommodationsRoute = createRoute({
  method: "get",
  path: "/accommodations",
  tags,
  description: "Retrieve a list of all accommodations",
  summary: "Get all accommodations",
  responses: {
    200: {
      description: "List of accommodations",
      content: {
        "application/json": {
          schema: AccommodationListSchema,
        },
      },
    },
  },
});

export const getAccommodationRoute = createRoute({
  method: "get",
  path: "/accommodations/{id}",
  tags,
  description: "Retrieve a specific accommodation by ID",
  summary: "Get accommodation by ID",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      description: "Accommodation details",
      content: {
        "application/json": {
          schema: AccomodationSchema,
        },
      },
    },
    404: {
      description: "Accommodation not found",
    },
  },
});

export const createAccommodationRoute = createRoute({
  method: "post",
  path: "/accommodations",
  tags,
  description: "Create a new accommodation",
  summary: "Create accommodation",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateAccommodationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Accommodation created successfully",
      content: {
        "application/json": {
          schema: AccomodationSchema,
        },
      },
    },
  },
});

export const updateAccommodationRoute = createRoute({
  method: "patch",
  path: "/accommodations/{id}",
  tags,
  description: "Update an existing accommodation",
  summary: "Update accommodation",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateAccommodationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Accommodation updated successfully",
      content: {
        "application/json": {
          schema: AccomodationSchema,
        },
      },
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

export const removeAccommodationRoute = createRoute({
  method: "delete",
  path: "/accommodations/{id}",
  tags,
  description: "Delete an accommodation by ID",
  summary: "Delete accommodation",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      description: "Accommodation deleted successfully",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    404: {
      description: "Accommodation not found",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
    },
  },
});

export type GetAccommodationsRoute = typeof getAccommodationsRoute;
export type GetAccommodationRoute = typeof getAccommodationRoute;
export type CreateAccommodationRoute = typeof createAccommodationRoute;
export type UpdateAccommodationRoute = typeof updateAccommodationRoute;
export type RemoveAccommodationRoute = typeof removeAccommodationRoute;
