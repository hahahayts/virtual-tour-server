import { UpdateUserSchema, UserSchema } from "@/schema/auth/index.js";
import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import { createRoute, z } from "@hono/zod-openapi";

const tags = ["Users"];

export const getUsersRoute = createRoute({
  method: "get",
  path: "/users",
  tags,
  description: "Get all users",
  summary: "Get all users",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            users: z.array(UserSchema),
          }),
        },
      },
      description: "All users retrieved.",
    },
  },
});

export const getUserRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  tags,
  description: "Get single user.",
  summary: "Get user by ID",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "User get by ID.",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "User not found.",
    },
  },
});

export const updateUserRoute = createRoute({
  method: "get",
  path: "/users/{id}",
  tags,
  description: "Update single user.",
  summary: "Update user by ID",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: UpdateUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Update user  by ID.",
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

export type GetUsersRoute = typeof getUsersRoute;
export type GetUserRoute = typeof getUserRoute;
export type UpdateUserRoute = typeof updateUserRoute;
