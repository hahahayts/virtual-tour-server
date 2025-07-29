import { z } from "@hono/zod-openapi";

export const IdParamsSchema = z.object({
  id: z.string(),
});
