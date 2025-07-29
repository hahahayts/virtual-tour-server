import type { AppRouteHandler } from "@/schema/route-handler.js";
import type {
  CreateWaterTransportationRoute,
  GetWaterTransportationRoute,
  GetWaterTransportationsRoute,
  RemoveWaterTransportationRoute,
  UpdateWaterTransportationRoute,
} from "./index.js";
import { prisma } from "@/lib/prisma.js";

const parseDepartureDays = (value: unknown): string[] =>
  Array.isArray(value) && value.every((v) => typeof v === "string")
    ? value
    : [];

export const getWaterTransportationsHandler: AppRouteHandler<
  GetWaterTransportationsRoute
> = async (c) => {
  const waterTransportations = await prisma.waterTransportation.findMany();

  const result = waterTransportations.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    expected_fee: t.expected_fee,
    departure_days: parseDepartureDays(t.departure_days), // 🔥 This is critical
    departure_time: t.departure_time,
    guidelines_and_policies: t.guidelines_and_policies,

    rebooking_supercharges: t.rebooking_supercharges,
    refund_policy: t.refund_policy,
    duration: t.duration,
    imageUrl_1: t.imageUrl_1,
    imageUrl_2: t.imageUrl_2,
    imageUrl_3: t.imageUrl_3,
    createdAt: t.createdAt.toISOString(),
    updatedAt: t.updatedAt.toISOString(),
    deletedAt: t.deletedAt ? t.deletedAt.toISOString() : null,
  }));

  return c.json({ waterTransportations: result }, 200);
};

export const getWaterTransportationHandler: AppRouteHandler<
  GetWaterTransportationRoute
> = async (c) => {
  const { id } = c.req.valid("param");

  const waterTransportation = await prisma.waterTransportation.findUnique({
    where: { id },
  });

  if (!waterTransportation)
    return c.json({ message: "Water transportation not found" }, 404);

  const result = {
    id: waterTransportation.id,
    name: waterTransportation.name,
    description: waterTransportation.description,

    expected_fee: waterTransportation.expected_fee,
    departure_days: parseDepartureDays(waterTransportation.departure_days), // 🔥 This is critical
    departure_time: waterTransportation.departure_time,
    guidelines_and_policies: waterTransportation.guidelines_and_policies,
    rebooking_supercharges: waterTransportation.rebooking_supercharges,
    refund_policy: waterTransportation.refund_policy,
    duration: waterTransportation.duration,
    imageUrl_1: waterTransportation.imageUrl_1,
    imageUrl_2: waterTransportation.imageUrl_2,
    imageUrl_3: waterTransportation.imageUrl_3,
    createdAt: waterTransportation.createdAt.toISOString(),
    updatedAt: waterTransportation.updatedAt.toISOString(),
    deletedAt: waterTransportation.deletedAt
      ? waterTransportation.deletedAt.toISOString()
      : null,
  };

  return c.json(result, 200);
};

export const createWaterTransportationHandler: AppRouteHandler<
  CreateWaterTransportationRoute
> = async (c) => {
  const data = c.req.valid("json");

  const waterTransportation = await prisma.waterTransportation.create({
    data: data,
  });

  const result = {
    id: waterTransportation.id,
    name: waterTransportation.name,
    description: waterTransportation.description,

    expected_fee: waterTransportation.expected_fee,
    departure_days: parseDepartureDays(waterTransportation.departure_days), // 🔥 This is critical
    departure_time: waterTransportation.departure_time,
    guidelines_and_policies: waterTransportation.guidelines_and_policies,
    rebooking_supercharges: waterTransportation.rebooking_supercharges,
    refund_policy: waterTransportation.refund_policy,
    duration: waterTransportation.duration,
    imageUrl_1: waterTransportation.imageUrl_1,
    imageUrl_2: waterTransportation.imageUrl_2,
    imageUrl_3: waterTransportation.imageUrl_3,
    createdAt: waterTransportation.createdAt.toISOString(),
    updatedAt: waterTransportation.updatedAt.toISOString(),
    deletedAt: waterTransportation.deletedAt
      ? waterTransportation.deletedAt.toISOString()
      : null,
  };

  return c.json(result, 200);
};

export const updateWaterTransportationHandler: AppRouteHandler<
  UpdateWaterTransportationRoute
> = async (c) => {
  try {
    const { id } = c.req.valid("param");
    const raw = c.req.valid("json");
    const data = { ...raw };

    if (Object.keys(data).length === 0)
      return c.json({ error: "No data provided for update" }, 400);

    if ("departure_days" in data) {
      data.departure_days = parseDepartureDays(data.departure_days);
    }

    const waterTransportation = await prisma.waterTransportation.update({
      where: { id },
      data,
    });

    const result = {
      id: waterTransportation.id,
      name: waterTransportation.name,
      description: waterTransportation.description,
      expected_fee: waterTransportation.expected_fee,
      departure_days: parseDepartureDays(waterTransportation.departure_days),
      departure_time: waterTransportation.departure_time,
      guidelines_and_policies: waterTransportation.guidelines_and_policies,
      rebooking_supercharges: waterTransportation.rebooking_supercharges,
      refund_policy: waterTransportation.refund_policy,
      duration: waterTransportation.duration,
      imageUrl_1: waterTransportation.imageUrl_1,
      imageUrl_2: waterTransportation.imageUrl_2,
      imageUrl_3: waterTransportation.imageUrl_3,
      createdAt: waterTransportation.createdAt.toISOString(),
      updatedAt: waterTransportation.updatedAt.toISOString(),
      deletedAt: waterTransportation.deletedAt
        ? waterTransportation.deletedAt.toISOString()
        : null,
    };

    return c.json(result, 200);
  } catch (error) {
    console.error("Update error:", error);
    return c.json({ message: "Server Error", error: String(error) }, 500);
  }
};

export const removeWaterTransportationHandler: AppRouteHandler<
  RemoveWaterTransportationRoute
> = async (c) => {
  const { id } = c.req.valid("param");

  const waterTransportation = await prisma.waterTransportation.delete({
    where: { id },
  });

  return c.json({ message: "Water transporation deleted successfully" }, 200);
};
