import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import {
  CreateRestaurantSchema,
  RestaurantListSchema,
  RestaurantSchema,
  UpdateRestaurantSchema,
} from "@/schema/restaurant/index.js";
import { createRoute } from "@hono/zod-openapi";

const tags = ["Restaurant"];

export const getRestaurantsRoute = createRoute({
  method: "get",
  path: "/restaurants",
  tags,
  description: "Get all restaurants",
  summary: "Retrieve a list of all restaurants",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: RestaurantListSchema,
        },
      },
      description: "A list of restaurants",
    },
  },
});

export const getRestaurantRoute = createRoute({
  method: "get",
  path: "/restaurants/{id}",
  tags,
  description: "Get a specific restaurant by ID.",
  summary: "Retrieve a restaurant by it's ID",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: RestaurantSchema,
        },
      },
      description: "A specific restaurant",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Destination not found",
    },
  },
});

export const createRestaurantRoute = createRoute({
  method: "post",
  path: "/restaurants",
  tags,
  description: "Create a new restaurant",
  summary: "Create a new restaurant",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateRestaurantSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: RestaurantSchema,
        },
      },
      description: "Restaurant created successfully",
    },
  },
});

export const updateRestaurantRoute = createRoute({
  method: "patch",
  path: "/restaurants/{id}",
  tags,
  description: "Update an existing restaurant",
  summary: "Update a restaurant by its ID",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateRestaurantSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: RestaurantSchema,
        },
      },
      description: "Restaurant updated successfully",
    },

    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Restaurant not found",
    },
    422: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "No updates provided",
    },
  },
});

export const removeRestaurantRoute = createRoute({
  method: "delete",
  path: "/restaurants/{id}",
  tags,
  description: "Delete a restaurant",
  summary: "Delete a restaurant by its ID",
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
      description: "Restaurant deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Restaurant not found",
    },
  },
});
export type GetRestaurantsRoute = typeof getRestaurantsRoute;
export type GetRestaurantRoute = typeof getRestaurantRoute;
export type CreateRestaurantRoute = typeof createRestaurantRoute;
export type UpdateRestaurantRoute = typeof updateRestaurantRoute;
export type RemoveRestaurantRoute = typeof removeRestaurantRoute;
