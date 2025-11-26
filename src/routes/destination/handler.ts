import type { AppRouteHandler } from "@/schema/route-handler.js";
import type {
  CreateDestinationRoute,
  GetDestinationRoute,
  GetDestinationsRoute,
  RemoveDestinationRoute,
  UpdateDestinationRoute,
} from "./index.js";
import { prisma } from "@/lib/prisma.js";

export const getDestinationsHandler: AppRouteHandler<
  GetDestinationsRoute
> = async (c) => {
  const destinations = await prisma.destination.findMany();

  return c.json({ destinations }, 200);
};

export const getDestinationHandler: AppRouteHandler<
  GetDestinationRoute
> = async (c) => {
  try {
    const { id } = c.req.valid("param");

    const destination = await prisma.destination.findUnique({
      where: { id },
    });

    if (!destination) {
      return c.json({ message: "Destination not found" }, 404);
    }

    return c.json(destination, 200);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create task";

    return c.json({ message: errorMessage }, 500);
  }
};

export const createDestinationHandler: AppRouteHandler<
  CreateDestinationRoute
> = async (c) => {
  try {
    const data = c.req.valid("json");

    const newDestination = await prisma.destination.create({
      data,
    });

    return c.json(newDestination, 200);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create task";

    return c.json({ message: errorMessage }, 500);
  }
};

export const updateDestinationHandler: AppRouteHandler<
  UpdateDestinationRoute
> = async (c) => {
  try {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");

    const updatedDestination = await prisma.destination.update({
      where: { id },
      data,
    });

    if (!updatedDestination) {
      return c.json({ message: "Destination not found" }, 404);
    }

    return c.json(updatedDestination, 200);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create task";

    return c.json({ message: errorMessage }, 500);
  }
};

export const removeDestinationHandler: AppRouteHandler<
  RemoveDestinationRoute
> = async (c) => {
  try {
    const { id } = c.req.valid("param");

    const deletedDestination = await prisma.destination.delete({
      where: { id },
    });

    if (!deletedDestination) {
      return c.json({ message: "Destination not found" }, 404);
    }

    return c.json({ message: "Destination deleted successfully" }, 200);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create task";

    return c.json({ message: errorMessage }, 500);
  }
};
