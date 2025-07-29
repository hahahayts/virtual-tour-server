import { z } from "@hono/zod-openapi";

export const DestinationSchema = z.object({
  id: z.string(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(10000),
  address: z.string().max(500).nullable(),

  // Contact Information
  email: z.string().max(320).nullable(),
  phone: z.string().max(20).nullable(),
  website: z.string().max(2048).nullable(),
  facebook: z.string().max(255).nullable(),

  // Media URLs
  imageUrl_1: z.string().max(2048).nullable(),
  imageUrl_2: z.string().max(2048).nullable(),
  imageUrl_3: z.string().max(2048).nullable(),
  imageUrl_4: z.string().max(2048).nullable(),
  imageUrl_5: z.string().max(2048).nullable(),
  videoUrl: z.string().max(2048).nullable(),

  // Coordinates
  latitude: z
    .number()
    .min(-90)
    .max(90)
    .refine((val) => Number(val.toFixed(6)) === val, {
      message: "Latitude must have up to 6 decimal places",
    })
    .nullable(),

  longitude: z
    .number()
    .min(-180)
    .max(180)
    .refine((val) => Number(val.toFixed(6)) === val, {
      message: "Longitude must have up to 6 decimal places",
    })
    .nullable(),

  // Statistics
  count: z.number().int().nonnegative().nullable(), // Positive integers only

  // Timestamps
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const DestinationListSchema = z.object({
  destinations: z.array(DestinationSchema),
});

export const CreateDestinationSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(10000),
  address: z.string().max(500).nullable(),
  email: z.string().max(320).nullable(),
  phone: z.string().max(20).nullable(),
  website: z.string().max(2048).nullable(),
  facebook: z.string().max(255).nullable(),
  three_sixty_imageUrl: z.string().max(2048).nullable(),
  imageUrl_1: z.string().max(2048).nullable(),
  imageUrl_2: z.string().max(2048).nullable(),
  imageUrl_3: z.string().max(2048).nullable(),
  imageUrl_4: z.string().max(2048).nullable(),
  imageUrl_5: z.string().max(2048).nullable(),
  videoUrl: z.string().max(2048).nullable(),
  latitude: z
    .number()
    .min(-90)
    .max(90)
    .refine((val) => Number(val.toFixed(6)) === val, {
      message: "Latitude must have up to 6 decimal places",
    })
    .nullable(),
  longitude: z
    .number()
    .min(-180)
    .max(180)
    .refine((val) => Number(val.toFixed(6)) === val, {
      message: "Longitude must have up to 6 decimal places",
    }),
});

export const UpdateDestinationSchema = CreateDestinationSchema.partial();
