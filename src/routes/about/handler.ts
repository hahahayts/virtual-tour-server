import type { AppRouteHandler } from "@/schema/route-handler.js";
import { prisma } from "@/lib/prisma.js";
import type {
  CreateAboutRoute,
  GetAboutRoute,
  RemoveAboutRoute,
  UpdateAboutRoute,
} from "../about/index.js";

export const getAboutHandler: AppRouteHandler<GetAboutRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const about = await prisma.about.findUnique({
    where: { id: Number(id) },
  });

  if (!about) return c.json({ message: "Item not found" }, 404);

  return c.json(about, 200);
};

export const createAboutHandler: AppRouteHandler<CreateAboutRoute> = async (
  c
) => {
  const data = c.req.valid("json");

  const about = await prisma.about.create({
    data: data,
  });

  return c.json(about, 200);
};

export const updateAboutHandler: AppRouteHandler<UpdateAboutRoute> = async (
  c
) => {
  const { id } = c.req.valid("param");
  const raw = c.req.valid("json");
  const data = { ...raw };

  if (Object.keys(data).length === 0)
    return c.json({ message: "No update provided" }, 400);

  const updateAbout = await prisma.about.update({
    where: { id: Number(id) },
    data,
  });

  return c.json(updateAbout, 200);
};

export const removeAboutHandler: AppRouteHandler<RemoveAboutRoute> = async (
  c
) => {
  const { id } = c.req.valid("param");

  await prisma.about.delete({
    where: { id: Number(id) },
  });

  return c.json({ message: "History deleted successfully" }, 200);
};
