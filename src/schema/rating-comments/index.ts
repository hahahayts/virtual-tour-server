import { z } from "@hono/zod-openapi";

export const RatingSchema = z.object({
  id: z.string().openapi({ example: "ckx123abc456" }),
  score: z.number().int().min(1).max(5).openapi({ example: 4 }),
  comment: z.string().max(10000).nullable().optional(),
  
  mac_address: z
    .string()
    .max(17)
    .nullable()
    .openapi({ example: "00:1B:44:11:3A:B7" }),

  destinationId: z.string().nullable(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const RatingListSchema = z.object({
  ratings: z.array(RatingSchema),
});

export const CreateRatingSchema = z.object({
  score: z.number().int().min(1).max(5),
  comment: z.string().max(10000).optional(),
  mac_address: z.string().max(17),
  destinationId: z.string().optional().nullable(),
});

export const UpdateRatingSchema = CreateRatingSchema.partial();
