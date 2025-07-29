
import { z } from "@hono/zod-openapi";


export const UserDataSchema = z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.object(),
    
})