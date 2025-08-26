import type { AppRouteHandler } from "@/schema/route-handler.js";
import type { GetUserRoute, GetUsersRoute, UpdateUserRoute } from "./index.js";
import { prisma } from "@/lib/prisma.js";

export const getUsersHandler: AppRouteHandler<GetUsersRoute> = async (c) => {
  const users = await prisma.user.findMany();

  return c.json({ users }, 200);
};

export const getUserHandler: AppRouteHandler<GetUserRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      created_at: true,
      updated_at: true,
      role: true,
    },
  });

  if (!user) return c.json({ message: "User not found" }, 404);

  return c.json(user, 200);
};
