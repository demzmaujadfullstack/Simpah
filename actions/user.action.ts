"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

import {prisma} from "@/lib/prisma";

import { Role } from "@prisma/client";

export async function getUsers() {
  return prisma.user.findMany({
    include: {
      region: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      region: true,
    },
  });
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: Role;
  regionId?: string | null;
}) {
  const exist = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (exist) {
    throw new Error("Email sudah digunakan.");
  }

  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
      regionId: data.regionId || null,
    },
  });

  revalidatePath("/dashboard/admin/users");
}

export async function updateUser(
  id: string,
  data: {
    name: string;
    email: string;
    role: Role;
    regionId?: string | null;
  }
) {
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      email: data.email,
      role: data.role,
      regionId: data.regionId || null,
    },
  });

  revalidatePath("/dashboard/admin/users");
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/admin/users");
}

export async function getUserStatistics() {
  const total = await prisma.user.count();

  const admin = await prisma.user.count({
    where: {
      role: "ADMIN",
    },
  });

  const petugas = await prisma.user.count({
    where: {
      role: "PETUGAS",
    },
  });

  const warga = await prisma.user.count({
    where: {
      role: "WARGA",
    },
  });

  return {
    total,
    admin,
    petugas,
    warga,
  };
}