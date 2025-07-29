import { UserSchema } from "@/schema/auth/index.js";
import { IdParamsSchema } from "@/schema/id-params.js";
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
  },
});

export type GetUsersRoute = typeof getUsersRoute;
export type GetUserRoute = typeof getUserRoute;
