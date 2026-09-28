"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getWasteCategories(search?: string) {
  return prisma.wasteCategory.findMany({
    where: search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : undefined,

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getWasteCategoryById(id: string) {
  return prisma.wasteCategory.findUnique({
    where: {
      id,
    },
  });
}

export async function createWasteCategory(
  name: string,
  point: number
) {
  await prisma.wasteCategory.create({
    data: {
      name,
      point,
    },
  });

  revalidatePath("/dashboard/admin/sampah");
}

export async function updateWasteCategory(
  id: string,
  name: string,
  point: number
) {
  await prisma.wasteCategory.update({
    where: {
      id,
    },

    data: {
      name,
      point,
    },
  });

  revalidatePath("/dashboard/admin/sampah");
}

export async function deleteWasteCategory(id: string) {
  await prisma.wasteCategory.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/admin/sampah");
}