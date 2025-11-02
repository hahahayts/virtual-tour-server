import { authMiddleware } from "@/middlewares/auth.js";
import {
  LoginDataSchema,
  LoginSchema,
  RegisterSchema,
  UserDataSchema,
  UserSchema,
} from "@/schema/auth/index.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import { createRoute, z } from "@hono/zod-openapi";

const tags = ["Auth"];

export const registerRoute = createRoute({
  method: "post",
  path: "/auth/register",
  tags,
  description: "Register",
  summary: "Register",
  request: {
    body: {
      content: {
        "application/json": {
          schema: RegisterSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserDataSchema,
        },
      },
      description: "Registered successfully", // Fixed typo
    },
    400: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Bad request",
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

export const loginRoute = createRoute({
  method: "post",
  path: "/auth/login",
  tags,
  description: "Login",
  summary: "Login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: LoginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: LoginDataSchema,
        },
      },
      description: "Logged in successfully", // Fixed typo
    },
    400: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Invalid credentials",
    },
  },
});

export const getMeRoute = createRoute({
  method: "get",
  path: "/auth/me",
  tags,
  description: "Get the current user",
  summary: "Get the current user",
  middleware: authMiddleware,
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Current User",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "User not found",
    },
  },
});

export const logoutRoute = createRoute({
  method: "post",
  path: "/auth/logout", // Fixed path - removed "admin" and added missing "/"
  tags,
  description: "Logout user", // Added description for consistency
  summary: "Logout user",
  middleware: authMiddleware, // Added auth middleware since we need session
  responses: {
    200: {
      description: "Successfully logged out",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    401: {
      // Added 401 response for unauthenticated requests
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    500: {
      description: "Failed to logout",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
  },
});

export const changePasswordRoute = createRoute({
  method: "patch",
  path: "/auth/change-password",
  tags,
  description: "Change account password",
  summary: "Change password for the authenticated user",
  middleware: authMiddleware,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z
            .object({
              old_password: z.string().min(6).openapi({
                example: "oldPassword123",
              }),
              new_password: z.string().min(6).openapi({
                example: "newSecurePassword456",
              }),
            })
            .openapi("ChangePasswordSchema"),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Password updated successfully",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    400: {
      description: "Invalid current password",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    401: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    404: {
      description: "Account not found",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    500: {
      description: "Failed to update password",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
  },
});

export type RegisterRoute = typeof registerRoute;
export type LoginRoute = typeof loginRoute;
export type GetMeRoute = typeof getMeRoute;
export type LogoutRoute = typeof logoutRoute; // Fixed - was pointing to loginRoute
export type ChangePasswordRoute = typeof changePasswordRoute;
