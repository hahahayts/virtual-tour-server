import { prisma } from "@/lib/prisma.js";
import type {
  CreateRatingRoute,
  GetRatingsRoute,
  GetRatingsByDestinationIdRoute,
  RemoveRatingRoute,
  UpdateRatingDisplayRoute,
} from "./index.js";
import type { AppRouteHandler } from "@/schema/route-handler.js";

import macAddress from "macaddress";

// 🟢 GET ALL RATINGS
export const getRatingsHandler: AppRouteHandler<GetRatingsRoute> = async (
  c
) => {
  const ratings = await prisma.rating.findMany({
    include: {
      destination: true,
    },
  });

  return c.json({ ratings }, 200);
};

// 🟢 GET RATINGS BY DESTINATION ID
export const getRatingsByDestinationIdHandler: AppRouteHandler<
  GetRatingsByDestinationIdRoute
> = async (c) => {
  const { id } = c.req.valid("param");

  try {
    const ratings = await prisma.rating.findMany({
      where: { destinationId: id },
    });

    if (!ratings || ratings.length === 0) {
      return c.json({ message: "No ratings found for this destination" }, 404);
    }

    return c.json({ ratings }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to fetch ratings" }, 500);
  }
};

// 🟢 CREATE NEW RATING
export const createRatingHandler: AppRouteHandler<CreateRatingRoute> = async (
  c
) => {
  const data = c.req.valid("json");
  const mac = await macAddress.one();

  try {
    // ✅ Check if the same MAC has already rated this destination
    const existing = await prisma.rating.findFirst({
      where: {
        mac_address: mac,
        destinationId: data.destinationId,
      },
    });

    if (existing) {
      return c.json(
        { message: "You already submitted a rating for this destination." },
        400
      );
    }

    // ✅ Otherwise, create new rating
    const newRating = await prisma.rating.create({
      data: {
        score: data.score,
        comment: data.comment,
        destinationId: data.destinationId,
        mac_address: mac,
        is_display: false, // 👈 ensure it's hidden until approved
      },
    });

    return c.json(newRating, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to create rating" }, 500);
  }
};

// 🟢 UPDATE DISPLAY STATUS
export const updateRatingDisplayHandler: AppRouteHandler<
  UpdateRatingDisplayRoute
> = async (c) => {
  const { id } = c.req.valid("param"); // ✅ only need the ID from URL

  try {
    const existing = await prisma.rating.findUnique({ where: { id } });
    if (!existing) {
      return c.json({ message: "Rating not found" }, 404);
    }

    // ✅ Directly approve (no need to read body)
    const updated = await prisma.rating.update({
      where: { id },
      data: { is_display: true },
    });

    return c.json(updated, 200);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to update rating display" }, 500);
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
