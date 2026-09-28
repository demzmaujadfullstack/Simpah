import Link from "next/link";
import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import {
  Plus,
  Search,
  Users,
} from "lucide-react";

import UserTable from "@/components/user/user-table";

type Props = {
  searchParams?: Promise<{
    q?: string;
    role?: string;
    page?: string;
  }>;
};

export default async function UserPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const keyword = params?.q ?? "";
  const role = params?.role ?? "";
  const page = Number(params?.page ?? "1");

  const take = 10;
  const skip = (page - 1) * take;

  const where = {
    AND: [
      {
        OR: [
          {
            name: {
              contains: keyword,
              mode: "insensitive" as const,
            },
          },
          {
            email: {
              contains: keyword,
              mode: "insensitive" as const,
            },
          },
        ],
      },

      ...(role
        ? [
            {
              role: role as Role,
            },
          ]
        : []),
    ],
  };

  // Ambil semua data sekaligus dengan Promise.all
  const [users, total, adminCount, petugasCount, wargaCount] =
    await Promise.all([
      // Data users untuk tabel (dengan pagination)
      prisma.user.findMany({
        where,
        include: {
          region: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take,
      }),

      // Total semua user (untuk pagination)
      prisma.user.count({
        where,
      }),

      // Count Admin (selalu akurat)
      prisma.user.count({
        where: {
          role: "ADMIN",
        },
      }),

      // Count Petugas (selalu akurat)
      prisma.user.count({
        where: {
          role: "PETUGAS",
        },
      }),

      // Count Warga (selalu akurat)
      prisma.user.count({
        where: {
          role: "WARGA",
        },
      }),
    ]);

  const totalPage = Math.ceil(total / take);

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Manajemen User
          </h1>

          <p className="text-slate-500">
            Kelola seluruh akun Admin,
            Petugas dan Warga.
          </p>
        </div>

        <Link
          href="/dashboard/admin/users/create"
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          <Plus size={20} />

          Tambah User
        </Link>
      </div>

      {/* CARD STATISTIK - Sekarang akurat */}

      <div className="grid gap-5 md:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Total User
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {total}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Admin
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            {adminCount}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Petugas
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {petugasCount}
          </h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow">
          <p className="text-sm text-slate-500">
            Warga
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {wargaCount}
          </h2>
        </div>
      </div>

      {/* SEARCH */}

      <form className="flex gap-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            name="q"
            defaultValue={keyword}
            placeholder="Cari nama atau email..."
            className="w-full rounded-xl border pl-11 pr-4 py-3"
          />
        </div>

        <select
          name="role"
          defaultValue={role}
          className="rounded-xl border px-4"
        >
          <option value="">
            Semua Role
          </option>

          <option value="ADMIN">
            ADMIN
          </option>

          <option value="PETUGAS">
            PETUGAS
          </option>

          <option value="WARGA">
            WARGA
          </option>
        </select>

        <button className="rounded-xl bg-emerald-600 px-6 text-white">
          Cari
        </button>
      </form>

      {/* TABLE */}

      <UserTable users={users} />

      {/* PAGINATION */}

      {totalPage > 1 && (
        <div className="flex justify-end gap-2">
          {Array.from({
            length: totalPage,
          }).map((_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}&q=${keyword}&role=${role}`}
              className={`rounded-lg border px-4 py-2 ${
                page === i + 1
                  ? "bg-emerald-600 text-white"
                  : "bg-white"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}