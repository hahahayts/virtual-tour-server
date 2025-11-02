import {
  RatingListSchema,
  RatingSchema,
  CreateRatingSchema,
} from "@/schema/rating-comments/index.js";
import { IdParamsSchema } from "@/schema/id-params.js";
import { ResponseMessageSchema } from "@/schema/response-message.js";
import { createRoute, z } from "@hono/zod-openapi";

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

// 🟢 GET RATINGS BY DESTINATION ID
export const getRatingsByDestinationIdRoute = createRoute({
  method: "get",
  path: "/ratings/destination/{id}",
  tags,
  description: "Get all ratings for a specific destination",
  summary: "Retrieve ratings by destination ID",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    200: {
      description: "Ratings retrieved successfully for this destination",
      content: {
        "application/json": {
          schema: RatingListSchema,
        },
      },
    },
    404: {
      description: "Destination not found or no ratings yet",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
  },
});

// 🟢 CREATE RATING
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
    400: {
      description: "User already submitted a rating",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
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

// 🟢 UPDATE DISPLAY STATUS (Approve / Hide)
export const updateRatingDisplayRoute = createRoute({
  method: "patch",
  path: "/ratings/{id}/display",
  tags,
  description: "Update display status of a rating",
  summary: "Approve or hide a rating (toggle is_display)",
  request: {
    params: IdParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: z.object({
            is_display: z.boolean().openapi({
              example: true,
              description: "Set true to show rating publicly",
            }),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: "Rating display status updated successfully",
      content: {
        "application/json": {
          schema: RatingSchema,
        },
      },
    },
    404: {
      description: "Rating not found",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
    500: {
      description: "Failed to update rating display",
      content: {
        "application/json": {
          schema: ResponseMessageSchema,
        },
      },
    },
  },
});

// 🧩 Export route types
export type GetRatingsRoute = typeof getRatingsRoute;
export type GetRatingsByDestinationIdRoute =
  typeof getRatingsByDestinationIdRoute;
export type CreateRatingRoute = typeof createRatingRoute;
export type UpdateRatingDisplayRoute = typeof updateRatingDisplayRoute;
export type RemoveRatingRoute = typeof removeRatingRoute;
