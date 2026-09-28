"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRegion(
  name: string,
  district: string
) {
  if (!name.trim()) {
    throw new Error("Nama wilayah wajib diisi.");
  }

  if (!district.trim()) {
    throw new Error("Kecamatan wajib diisi.");
  }

  const exist = await prisma.region.findFirst({
    where: {
      name,
      district,
    },
  });

  if (exist) {
    throw new Error("Wilayah sudah ada.");
  }

  await prisma.region.create({
    data: {
      name,
      district,
    },
  });

  revalidatePath("/dashboard/admin/wilayah");
}

export async function updateRegion(
  id: string,
  name: string,
  district: string
) {
  if (!name.trim()) {
    throw new Error("Nama wilayah wajib diisi.");
  }

  if (!district.trim()) {
    throw new Error("Kecamatan wajib diisi.");
  }

  await prisma.region.update({
    where: {
      id,
    },
    data: {
      name,
      district,
    },
  });

  revalidatePath("/dashboard/admin/wilayah");
}

export async function deleteRegion(id: string) {
  await prisma.region.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/admin/wilayah");
}