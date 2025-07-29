import type { AppRouteHandler } from "@/schema/route-handler.js";
import type {
  CreateRestaurantRoute,
  GetRestaurantRoute,
  GetRestaurantsRoute,
  RemoveRestaurantRoute,
  UpdateRestaurantRoute,
} from "./index.js";
import { prisma } from "@/lib/prisma.js";

export const getRestaurantsHandler: AppRouteHandler<
  GetRestaurantsRoute
> = async (c) => {
  const restaurants = await prisma.restaurant.findMany();

  return c.json({ restaurants }, 200);
};

export const getRestaurantHandler: AppRouteHandler<GetRestaurantRoute> = async (
  c
) => {
  const { id } = c.req.valid("param");

  const restaurant = await prisma.restaurant.findUnique({
    where: { id },
  });

  if (!restaurant) return c.json({ message: "Item not found" }, 404);

  return c.json(restaurant, 200);
};

export const createRestaurantHandler: AppRouteHandler<
  CreateRestaurantRoute
> = async (c) => {
  const data = c.req.valid("json");

  const restaurant = await prisma.restaurant.create({
    data: data,
  });

  return c.json(restaurant, 200);
};

export const updateRestaurantHandler: AppRouteHandler<
  UpdateRestaurantRoute
> = async (c) => {
  const { id } = c.req.valid("param");
  const data = c.req.valid("json");

  if (Object.keys(data).length === 0)
    return c.json({ message: "No updates provided" }, 422);

  const restaurant = await prisma.restaurant.update({
    where: { id },
    data: data,
  });

  if (!restaurant) return c.json({ message: "Item not found" }, 404);

  return c.json(restaurant, 200);
};

export const removeRestaurantHandler: AppRouteHandler<
  RemoveRestaurantRoute
> = async (c) => {
  const { id } = c.req.valid("param");

  const restaurant = await prisma.restaurant.delete({
    where: { id },
  });

  if (!restaurant) return c.json({ message: "Item not found" }, 404);

  return c.json({ message: "Restaurant deleted successfully" }, 200);
};
