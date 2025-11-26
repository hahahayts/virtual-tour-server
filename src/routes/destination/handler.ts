import type { AppRouteHandler } from "@/schema/route-handler.js";
import type {
  CreateDestinationRoute,
  GetDestinationRoute,
  GetDestinationsRoute,
  RemoveDestinationRoute,
  UpdateDestinationRoute,
} from "./index.js";
import { prisma } from "@/lib/prisma.js";
import { Prisma } from "@prisma/client";

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
    console.error("Error fetching destination:", error);

    // Convert error to string safely
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

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

    return c.json(newDestination, 200); // Use 201 for created resources
  } catch (error) {
    // Convert error to string safely
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create destination";

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

    return c.json(updatedDestination, 200);
  } catch (error) {
    // Handle Prisma not found error specifically
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return c.json({ message: "Destination not found" }, 404);
    }

    // Convert error to string safely
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update destination";

    return c.json({ message: errorMessage }, 500);
  }
};
export const removeDestinationHandler: AppRouteHandler<
  RemoveDestinationRoute
> = async (c) => {
  try {
    const { id } = c.req.valid("param");

    await prisma.destination.delete({
      where: { id },
    });

    return c.json({ message: "Destination deleted successfully" }, 200);
  } catch (error) {
    // Handle Prisma not found error specifically
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return c.json({ message: "Destination not found" }, 404);
    }

    // Convert error to string safely
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete destination";

    return c.json({ message: errorMessage }, 500);
  }
};
