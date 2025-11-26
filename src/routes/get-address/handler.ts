import type { AppRouteHandler } from "@/schema/route-handler.js";
import type {
  GetDestinationVisitStatsRoute,
  GetMacAddressRoute,
} from "./index.js";
import macAddress from "macaddress";
import { prisma } from "@/lib/prisma.js";

export const getMacAddressHandler: AppRouteHandler<GetMacAddressRoute> = async (
  c
) => {
  try {
    // Get server MAC (for demo); in production, use client IP
    const mac_address = await macAddress.one();

    const month = new Date().toLocaleString("default", { month: "long" });
    const year = new Date().getFullYear();

    // Check if this MAC already visited this month/year
    const existing = await prisma.visit.findUnique({
      where: {
        macAddress_month_year: { macAddress: mac_address, month, year },
      },
    });

    // Only create if this is the first visit for this MAC this month
    if (!existing) {
      await prisma.visit.create({
        data: { macAddress: mac_address, month, year },
      });
    }

    // Get aggregated chart data
    const grouped = await prisma.visit.groupBy({
      by: ["month"],
      _count: { macAddress: true },
      where: { year },
    });

    // Sort months
    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Format for chart
    const chartData = MONTHS.map((m) => ({
      month: m,
      visited: grouped.find((g) => g.month === m)?._count.macAddress ?? 0,
    }));

    return c.json(
      {
        mac_address,
        message: existing
          ? "You already visited this month."
          : "Visit logged successfully.",
        chartData,
      },
      200
    );
  } catch (error) {
    console.error("Error logging visit:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};

export const getDestinationVisitStatsHandler: AppRouteHandler<
  GetDestinationVisitStatsRoute
> = async (c) => {
  try {
    const { destinationId } = c.req.valid("param");
    const year = new Date().getFullYear();

    const visits = await prisma.destinationVisits.groupBy({
      by: ["month"],
      _count: { id: true },
      where: { destinationId, year },
    });

    const MONTHS = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const chartData = MONTHS.map((m) => ({
      month: m,
      visited: visits.find((v) => v.month === m)?._count.id ?? 0,
    }));

    return c.json({ chartData }, 200);
  } catch (error) {
    console.error("Error fetching destination stats:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
};
