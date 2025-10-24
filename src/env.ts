import { config } from "dotenv";
import z from "zod";

config();

const envSchema = z.object({
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  PORT: z.coerce.number().optional(),
});

export const envConfig = envSchema.parse({
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  PORT: process.env.PORT,
});

export type EnvConfig = z.infer<typeof envConfig>;
