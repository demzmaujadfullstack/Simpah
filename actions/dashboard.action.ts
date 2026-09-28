"use server";

import { prisma } from "@/lib/prisma";

export async function getDashboardStats() {
  const [users, regions, categories, submissions] =
    await Promise.all([
      prisma.user.count(),
      prisma.region.count(),
      prisma.wasteCategory.count(),
      prisma.submission.count(),
    ]);

  return {
    users,
    regions,
    categories,
    submissions,
  };
}