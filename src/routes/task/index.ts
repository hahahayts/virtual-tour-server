import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import {
  CreateTaskSchema,
  TaskResponseSchema,
  TaskSchema,
  TaskUpdateSchema,
} from "@/schema/task/index.js";
import { createRoute, z } from "@hono/zod-openapi";

const tags = ["Task"];

export const getTasksRoute = createRoute({
  method: "get",
  path: "/tasks",
  tags,
  responses: {
    200: {
      description: "List of tasks",
      content: {
        "application/json": {
          schema: TaskResponseSchema,
        },
      },
    },
  },
});

export const getTaskRoute = createRoute({
  method: "get",
  path: "/tasks/{id}",
  tags,
  request: {
    params: IdParamsSchema,
  },
  description: "Retrieve single task",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TaskSchema,
        },
      },
      description: "Task retrieved successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Task not found",
    },
  },
});

export const createTaskRoute = createRoute({
  method: "post",
  path: "/tasks",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateTaskSchema,
        },
      },
      description: "Create a new task",
    },
  },
  responses: {
    200: {
      description: "Task created successfully",
      content: {
        "application/json": {
          schema: TaskSchema,
        },
      },
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

export const deleteTaskRoute = createRoute({
  method: "delete",
  path: "/tasks/{id}",
  tags,
  request: {
    params: IdParamsSchema,
  },
  description: "Delete single task",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Deleted single task successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Task not found",
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

export const updateTaskRoute = createRoute({
  method: "patch",
  path: "/tasks/{id}",
  tags,
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: TaskUpdateSchema,
        },
      },
    },
  },
  description: "Update a single task",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ name: z.string() }),
        },
      },
      description: "Task updated successfully",
    },
    400: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Bad request, invalid input",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Task not found",
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

export type GetTasksRoute = typeof getTasksRoute;
export type GetTaskRoute = typeof getTaskRoute;
export type CreateTaskRoute = typeof createTaskRoute;
export type DeleteTaskRoute = typeof deleteTaskRoute;
export type UpdateTaskRoute = typeof updateTaskRoute;
