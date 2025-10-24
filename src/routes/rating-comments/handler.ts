import { prisma } from "@/lib/prisma.js";
import type {
  CreateRatingRoute,
  GetRatingsRoute,
  RemoveRatingRoute,
} from "./index.js";
import type { AppRouteHandler } from "@/schema/route-handler.js";

// 🟢 GET ALL RATINGS
export const getRatingsHandler: AppRouteHandler<GetRatingsRoute> = async (
  c
) => {
  const ratings = await prisma.rating.findMany();

  return c.json({ ratings }, 200);
};

// 🟢 CREATE NEW RATING
export const createRatingHandler: AppRouteHandler<CreateRatingRoute> = async (
  c
) => {
  const data = c.req.valid("json");

  try {
    const newRating = await prisma.rating.create({
      data,
    });

    return c.json(newRating, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to create rating" }, 500);
  }
};

// 🟠 DELETE RATING
export const removeRatingHandler: AppRouteHandler<RemoveRatingRoute> = async (
  c
) => {
  const { id } = c.req.valid("param");

  try {
    const deletedRating = await prisma.rating.delete({
      where: { id },
    });

    if (!deletedRating) {
      return c.json({ message: "Rating not found" }, 404);
    }

    return c.json({ message: "Rating deleted successfully" }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to delete rating" }, 500);
  }
};
