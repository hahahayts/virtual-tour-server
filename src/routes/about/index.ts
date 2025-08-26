import {
  AboutCreateSchema,
  AboutDataSchema,
  UpdateAboutSchema,
} from "@/schema/about/index.js";
import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import { createRoute } from "@hono/zod-openapi";

const tags = ["About Tubigon"];

export const getAboutRoute = createRoute({
  method: "get",
  path: "/about/{id}",
  tags,
  description: "Retrieving the specific about info data",
  summary: "Get about by ID",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: AboutDataSchema,
        },
      },
      description: "Retrieving the about data by ID",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "About not Found",
    },
  },
});

export const createAboutRoute = createRoute({
  method: "post",
  path: "/about",
  tags,
  description: "Creating about info",
  summary: "Create about info",
  request: {
    body: {
      content: {
        "application/json": {
          schema: AboutCreateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: AboutDataSchema,
        },
      },
      description: "Retrieving the about data by ID",
    },
  },
});

export const updateAboutRoute = createRoute({
  method: "patch",
  path: "/about/{id}",
  tags,
  description: "Retrieving the specific about info data",
  summary: "Get about by ID",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateAboutSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: AboutDataSchema,
        },
      },
      description: "Retrieving the about data by ID",
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
      description: "About not Found",
    },
  },
});

export const removeAboutRoute = createRoute({
  method: "delete",
  path: "/about/{id}",
  tags,
  description: "Delete history",
  summary: "Delete history",
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
      description: "About deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "About not found",
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

export type GetAboutRoute = typeof getAboutRoute;
export type CreateAboutRoute = typeof createAboutRoute;
export type UpdateAboutRoute = typeof updateAboutRoute;
export type RemoveAboutRoute = typeof removeAboutRoute;
