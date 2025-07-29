import { authMiddleware } from "@/middlewares/auth.js";
import type {
  GetMeRoute,
  LoginRoute,
  LogoutRoute,
  RegisterRoute,
} from "./index.js";
import { prisma } from "@/lib/prisma.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "@/lib/auth.js";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { AppRouteHandler } from "@/schema/route-handler.js";
import type { Session } from "@/types/auth.js";

export const registerHandler: AppRouteHandler<RegisterRoute> = async (c) => {
  const { first_name, last_name, email, password } = c.req.valid("json");

  const account = await prisma.account.findUnique({
    where: { email },
  });

  if (account) return c.json({ message: "Email is already taken" }, 400);

  const hashedPass = await bcrypt.hash(password, 12);

  try {
    const newUser = await prisma.$transaction(async (tx) => {
      const createdAccount = await tx.account.create({
        data: {
          email,
          password: hashedPass,
        },
      });
      const createdUser = await tx.user.create({
        data: {
          first_name,
          last_name,
          id: createdAccount.id,
          email: createdAccount.email,
        },
      });

      return createdUser;
    });

    return c.json(
      { user: newUser, message: "Account created successfully" },
      200
    );
  } catch {
    return c.json({ message: "Failed to create an account" }, 500);
  }
};

export const loginHandler: AppRouteHandler<LoginRoute> = async (c) => {
  const { email, password } = c.req.valid("json");

  const account = await prisma.account.findUnique({
    where: { email },
  });
  if (!account) return c.json({ message: "Invalid credentials." }, 400);

  const isValidPassword = bcrypt.compareSync(password, account?.password);
  if (!isValidPassword) return c.json({ message: "Invalid credentials." }, 400);

  const payload = {
    id: account?.id,
    email: account?.email,
  };

  const { accessToken, refreshToken } = await generateTokens(payload);

  await prisma.$transaction(async (tx) => {
    await tx.refreshToken.deleteMany({
      where: { account_id: account.id },
    });

    await tx.refreshToken.create({
      data: {
        token: refreshToken,
        account_id: account.id,
      },
    });
  });

  setCookie(c, "auth__accessToken", accessToken, {
    path: "/",
    sameSite: "Lax",
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60),
  });

  setCookie(c, "auth__refreshToken", refreshToken, {
    path: "/",
    sameSite: "Lax",
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60),
  });

  const accessToken1 = getCookie(c, "auth__accessToken");
  const refreshToken1 = getCookie(c, "auth__refreshToken");

  console.log("Login: ");
  console.log("Access Token", accessToken1);
  console.log("Refresh Token", refreshToken1);

  return c.json({ accessToken }, 200);
};

export const getMeHandler: AppRouteHandler<GetMeRoute> = async (c) => {
  const session = c.get("session") as Session;

  const user = await prisma.user.findUnique({
    where: {
      id: session.account_id,
    },
  });

  console.log(user);

  if (!user) {
    return c.json({ message: "User not found" }, 404);
  }

  return c.json(user, 200);
};

export const logoutHandler: AppRouteHandler<LogoutRoute> = async (c) => {
  const session = c.get("session") as Session;

  try {
    // Remove the refresh token from the database
    await prisma.refreshToken.deleteMany({
      where: { account_id: session.account_id },
    });

    // Clear both cookies
    deleteCookie(c, "auth__accessToken", {
      path: "/",
    });

    deleteCookie(c, "auth__refreshToken", {
      path: "/",
    });

    return c.json({ message: "Logged out successfully" }, 200);
  } catch (error) {
    return c.json({ message: "Failed to logout" }, 500);
  }
};
