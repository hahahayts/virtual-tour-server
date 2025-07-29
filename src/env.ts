import { config } from "dotenv";
import z from "zod";

config();

const envSchema = z.object({
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});

export const envConfig = envSchema.parse({
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
});

export type EnvConfig = z.infer<typeof envConfig>;
