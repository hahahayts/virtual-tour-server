import type { AppRouteHandler } from "@/schema/route-handler.js";
import type {
  CreateLandTransportationRoute,
  GetLandTransportationRoute,
  GetLandTransportationsRoute,
  RemoveLandTransportation,
  UpdateLandTransportation,
} from "./index.js";
import { prisma } from "@/lib/prisma.js";

export const getLandTransportationsHandler: AppRouteHandler<
  GetLandTransportationsRoute
> = async (c) => {
  const landTransportations = await prisma.landTransportation.findMany();
  return c.json({ landTransportations }, 200);
};

export const getLandTransportationHandler: AppRouteHandler<
  GetLandTransportationRoute
> = async (c) => {
  const { id } = c.req.valid("param");
  const landTransportation = await prisma.landTransportation.findUnique({
    where: { id },
  });

  if (!landTransportation)
    return c.json({ message: "There's no land transportation" }, 404);

  return c.json(landTransportation, 200);
};

export const createLandTransportationHandler: AppRouteHandler<
  CreateLandTransportationRoute
> = async (c) => {
  const data = c.req.valid("json");

  const landTransportation = await prisma.landTransportation.create({
    data,
  });

  return c.json(landTransportation, 200);
};

export const updateLandTransportationHandler: AppRouteHandler<
  UpdateLandTransportation
> = async (c) => {
  const { id } = c.req.valid("param");
  const raw = c.req.valid("json");
  const data = { ...raw };

  console.log(id);

  if (Object.keys(data).length === 0)
    return c.json({ error: "No data provided for update" }, 400);

  const updateLandTransportation = await prisma.landTransportation.update({
    where: { id },
    data,
  });

  console.log(updateLandTransportation);

  if (!updateLandTransportation) {
    return c.json({ message: "Land transportation not found" }, 404);
  }

  return c.json(updateLandTransportation, 200);
};

export const removeLandTransportationHandler: AppRouteHandler<
  RemoveLandTransportation
> = async (c) => {
  const { id } = c.req.valid("param");

  await prisma.landTransportation.delete({
    where: { id },
  });

  return c.json({ message: "Water transporation deleted successfully" }, 200);
};
