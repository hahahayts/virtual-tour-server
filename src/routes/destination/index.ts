import {
  CreateDestinationSchema,
  DestinationListSchema,
  DestinationSchema,
  UpdateDestinationSchema,
} from "@/schema/destination/index.js";
import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import { createRoute } from "@hono/zod-openapi";

const tags = ["Destination"];

export const getDestinationsRoute = createRoute({
  method: "get",
  path: "/destinations",
  tags,
  description: "Get all destinations",
  summary: "Retrieve a list of all destinations",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DestinationListSchema,
        },
      },
      description: "A list of destinations",
    },
  },
});

export const getDestinationRoute = createRoute({
  method: "get",
  path: "/destinations/{id}",
  tags,
  description: "Get a specific destination by ID",
  summary: "Retrieve a destination by its ID",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DestinationSchema,
        },
      },
      description: "A specific destination",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Destination not found",
    },
    500: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Internal server error",
    },
  },
});

export const createDestinationRoute = createRoute({
  method: "post",
  path: "/destinations",
  tags,
  description: "Create a new destination",
  summary: "Create a new destination",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateDestinationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DestinationSchema,
        },
      },
      description: "Destination created successfully",
    },
    500: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Internal server error",
    },
  },
});

export const updateDestinationRoute = createRoute({
  method: "patch",
  path: "/destinations/{id}",
  tags,
  description: "Update an existing destination",
  summary: "Update a destination by its ID",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateDestinationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: DestinationSchema,
        },
      },
      description: "Destination updated successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Destination not found",
    },
    500: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Internal server error",
    },
  },
});

export const removeDestinationRoute = createRoute({
  method: "delete",
  path: "/destinations/{id}",
  tags,
  description: "Delete a destination",
  summary: "Delete a destination by its ID",
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
      description: "Destination deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Destination not found",
    },
    500: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Internal server error",
    },
  },
});

export type GetDestinationsRoute = typeof getDestinationsRoute;
export type GetDestinationRoute = typeof getDestinationRoute;
export type CreateDestinationRoute = typeof createDestinationRoute;
export type UpdateDestinationRoute = typeof updateDestinationRoute;
export type RemoveDestinationRoute = typeof removeDestinationRoute;
