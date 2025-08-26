import {
  HistoryCreateSchema,
  HistoryDataSchema,
  UpdateHistorySchema,
} from "@/schema/history/index.js";
import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import { createRoute, z } from "@hono/zod-openapi";

const tags = ["History"];

export const getHistoriesRoute = createRoute({
  method: "get",
  path: "/history",
  tags,
  description: "Retrieving all the history data",
  summary: "Get all histories",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            histories: z.array(HistoryDataSchema),
          }),
        },
      },
      description: "Retrieving all the history data",
    },
  },
});

export const getHistoryRoute = createRoute({
  method: "get",
  path: "/history/{id}",
  tags,
  description: "Retrieving the specific  history data",
  summary: "Get history by ID",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HistoryDataSchema,
        },
      },
      description: "Retrieving the history data by ID",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "History not Found",
    },
  },
});

export const createHistoryRoute = createRoute({
  method: "post",
  path: "/history",
  tags,
  description: "Creating history",
  summary: "Create history",
  request: {
    body: {
      content: {
        "application/json": {
          schema: HistoryCreateSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HistoryDataSchema,
        },
      },
      description: "Retrieving the history data by ID",
    },
  },
});

export const updateHistoryRoute = createRoute({
  method: "patch",
  path: "/history/{id}",
  tags,
  description: "Retrieving the specific  history data",
  summary: "Get history by ID",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateHistorySchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: HistoryDataSchema,
        },
      },
      description: "Retrieving the history data by ID",
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
      description: "History not Found",
    },
  },
});

export const removeHistoryRoute = createRoute({
  method: "delete",
  path: "/history/{id}",
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

export type GetHistoriesRoute = typeof getHistoriesRoute;
export type GetHistoryRoute = typeof getHistoryRoute;
export type CreateHistoryRoute = typeof createHistoryRoute;
export type UpdateHistoryRoute = typeof updateHistoryRoute;
export type RemoveHistoryRoute = typeof removeHistoryRoute;
