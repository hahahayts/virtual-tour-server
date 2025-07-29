import type { AppRouteHandler } from "@/schema/route-handler.js";
import type { GetUsersRoute } from "./index.js";
import { prisma } from "@/lib/prisma.js";

export const getUsersHandler: AppRouteHandler<GetUsersRoute> = async (c) => {
  const users = await prisma.user.findMany();

  return c.json({ users }, 200);
};


