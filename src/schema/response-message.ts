import { z } from "@hono/zod-openapi";

export const ResponseMessageSchema = z.object({
  message: z.string(),
});
