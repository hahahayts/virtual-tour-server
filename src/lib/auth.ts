import { envConfig } from "@/env.js";
import { sign } from "hono/jwt";

interface Payload {
  id: string | null;
  email: string | null;
}
export const generateTokens = async (payload: Payload) => {
  const accessToken = await sign(
    {
      id: payload.id,
      email: payload.email,
      exp: Math.floor(Date.now() / 1000) + 15 * 60 * 60,
    },
    envConfig.JWT_ACCESS_SECRET
  );
  const refreshToken = await sign(
    {
      id: payload.id,
      email: payload.email,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    },
    envConfig.JWT_REFRESH_SECRET
  );

  return { accessToken, refreshToken };
};
