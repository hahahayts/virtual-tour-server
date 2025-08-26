import type { AppRouteHandler } from "@/schema/route-handler.js";
import type {
  CreateHistoryRoute,
  GetHistoriesRoute,
  GetHistoryRoute,
  RemoveHistoryRoute,
  UpdateHistoryRoute,
} from "./index.js";
import { prisma } from "@/lib/prisma.js";

export const getHistoriesHandler: AppRouteHandler<GetHistoriesRoute> = async (
  c
) => {
  const histories = await prisma.history.findMany();

  return c.json({ histories }, 200);
};

export const getHistoryHandler: AppRouteHandler<GetHistoryRoute> = async (
  c
) => {
  const { id } = c.req.valid("param");

  const history = await prisma.history.findUnique({
    where: { id },
  });

  if (!history) return c.json({ message: "Item not found" }, 404);

  return c.json(history, 200);
};

export const createHistoryHandler: AppRouteHandler<CreateHistoryRoute> = async (
  c
) => {
  const data = c.req.valid("json");

  const history = await prisma.history.create({
    data: data,
  });

  return c.json(history, 200);
};

export const updateHistoryHandler: AppRouteHandler<UpdateHistoryRoute> = async (
  c
) => {
  const { id } = c.req.valid("param");
  const raw = c.req.valid("json");
  const data = { ...raw };

  if (Object.keys(data).length === 0)
    return c.json({ message: "No update provided" }, 400);

  const updatedHistory = await prisma.history.update({
    where: { id },
    data,
  });

  return c.json(updatedHistory, 200);
};

export const removeHistoryHandler: AppRouteHandler<RemoveHistoryRoute> = async (
  c
) => {
  const { id } = c.req.valid("param");

  await prisma.history.delete({
    where: { id },
  });

  return c.json({ message: "History deleted successfully" }, 200);
};
