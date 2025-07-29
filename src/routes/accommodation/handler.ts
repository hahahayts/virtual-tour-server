import type { AppRouteHandler } from "@/schema/route-handler.js";
import type {
  CreateAccommodationRoute,
  GetAccommodationRoute,
  GetAccommodationsRoute,
  RemoveAccommodationRoute,
  UpdateAccommodationRoute,
} from "./index.js";
import { prisma } from "@/lib/prisma.js";

export const getAccommodationsHandler: AppRouteHandler<
  GetAccommodationsRoute
> = async (c) => {
  const accommodations = await prisma.accommodation.findMany();

  return c.json({ accommodations }, 200);
};

export const getAccommodationHandler: AppRouteHandler<
  GetAccommodationRoute
> = async (c) => {
  const { id } = c.req.param();
  const accommodation = await prisma.accommodation.findUnique({
    where: { id },
  });

  if (!accommodation) {
    return c.json({ error: "Accommodation not found" }, 404);
  }

  return c.json(accommodation, 200);
};

export const createAccommodationHandler: AppRouteHandler<
  CreateAccommodationRoute
> = async (c) => {
  const data = c.req.valid("json");

  const accommodation = await prisma.accommodation.create({
    data,
  });
  return c.json(accommodation, 201);
};

export const updateAccommodationHandler: AppRouteHandler<
  UpdateAccommodationRoute
> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");

  if (Object.keys(data).length === 0) {
    return c.json({ error: "No data provided for update" }, 400);
  }
  const accommodation = await prisma.accommodation.update({
    where: { id },
    data,
  });
  return c.json(accommodation, 200);
};

export const removeAccommodationHandler: AppRouteHandler<
  RemoveAccommodationRoute
> = async (c) => {
  const { id } = c.req.valid("param");

  const accommodation = await prisma.accommodation.delete({
    where: { id },
  });

  if (!accommodation) {
    return c.json({ error: "Accommodation not found" }, 404);
  }

  return c.json({ message: "Accommodation deleted successfully" }, 200);
};
