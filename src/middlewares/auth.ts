import { envConfig } from "@/env.js";
import { generateTokens } from "@/lib/auth.js";
import { prisma } from "@/lib/prisma.js";
import type { MiddlewareHandler } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { verify } from "hono/jwt";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const accessToken = getCookie(c, "auth__accessToken");
  const refreshToken = getCookie(c, "auth__refreshToken");

  console.log("Access Token", accessToken); //undefined
  console.log("Refresh Token", refreshToken); //undefined

  if (!accessToken || !refreshToken)
    return c.json({ message: "Unauthorized" }, 401);

  try {
    const decodedAccessToken = await verify(
      accessToken,
      envConfig.JWT_ACCESS_SECRET
    );

    c.set("session", {
      account_id: decodedAccessToken.id,
      email: decodedAccessToken.email,
    });
  } catch {
    try {
      const decodedRefreshToken = (await verify(
        refreshToken,
        envConfig.JWT_REFRESH_SECRET
      )) as Record<"id" | "email", string>;

      const currentSession = await prisma.refreshToken.findFirst({
        where: {
          token: refreshToken,
        },
      });

      if (!currentSession || !decodedRefreshToken)
        return c.json({ message: "Session not found" }, 401);

      const payload = {
        id: decodedRefreshToken.id,
        email: decodedRefreshToken.email,
      };

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        await generateTokens(payload);

      await prisma.$transaction(async (tx) => {
        await tx.refreshToken.delete({
          where: { id: payload.id },
        });
        await tx.refreshToken.create({
          data: {
            account_id: payload.id,
            token: newRefreshToken,
          },
        });
      });

      setCookie(c, "auth__accessToken", newAccessToken, {
        path: "/",
        sameSite: "Strict",
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
      });

      setCookie(c, "auth__refreshToken", newRefreshToken, {
        path: "/",
        sameSite: "Strict",
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      });

      // setCookie(c, "accessToken", newAccessToken, {
      //   httpOnly: true,
      //   secure: false, // Disable in dev if using HTTP
      //   sameSite: "strict",
      //   maxAge: 15 * 60, // 15 minutes
      //   path: "/",
      // });

      // setCookie(c, "refreshToken", newRefreshToken, {
      //   httpOnly: true,
      //   secure: false,
      //   sameSite: "strict",
      //   maxAge: 7 * 24 * 60 * 60, // 7 days
      //   path: "/",
      // });

      c.set("session", {
        account_id: decodedRefreshToken.id,
        email: decodedRefreshToken.email,
      });
    } catch {
      return c.json({ message: "Unauthorized" }, 401);
    }
  }

  await next();
};
