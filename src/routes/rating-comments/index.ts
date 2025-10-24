import {
  RatingListSchema,
  RatingSchema,
  CreateRatingSchema,
} from "@/schema/rating-comments/index.js";
import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import { createRoute } from "@hono/zod-openapi";

const tags = ["Ratings"];

// 🟢 GET ALL RATINGS
export const getRatingsRoute = createRoute({
  method: "get",
  path: "/ratings",
  tags,
  description: "Get all ratings",
  summary: "Retrieve all ratings",
  responses: {
    200: {
      description: "Ratings retrieved successfully",
      content: {
        "application/json": {
          schema: RatingListSchema,
        },
      },
    },
  },
});

// 🟢 CREATE NEW RATING
export const createRatingRoute = createRoute({
  method: "post",
  path: "/ratings",
  tags,
  description: "Post a new rating",
  summary: "Create a new rating",
  request: {
    body: {
      content: {
        "application/json": {
          schema: CreateRatingSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Rating created successfully",
      content: {
        "application/json": {
          schema: RatingSchema,
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

// 🟠 DELETE RATING
export const removeRatingRoute = createRoute({
  method: "delete",
  path: "/ratings/{id}",
  tags,
  description: "Delete rating",
  summary: "Delete a rating by its ID",
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
      description: "Rating deleted successfully",
    },
    404: {
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
      description: "Rating not found",
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

// 🧩 Export route types
export type GetRatingsRoute = typeof getRatingsRoute;
export type CreateRatingRoute = typeof createRatingRoute;
export type RemoveRatingRoute = typeof removeRatingRoute;
