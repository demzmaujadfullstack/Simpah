import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { deleteRegion } from "@/actions/region.action";

import {
  Pencil,
  Trash2,
  Plus,
  Search,
  MapPinned,
} from "lucide-react";

export default async function RegionPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
  }>;
}) {
  const params = await searchParams;

  const keyword = params?.q ?? "";

  const regions = await prisma.region.findMany({
    where: {
      OR: [
        {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          district: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Master Wilayah
          </h1>

          <p className="text-gray-500">
            Kelola seluruh wilayah bank sampah.
          </p>
        </div>

        <Link
          href="/dashboard/admin/wilayah/create"
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          <Plus size={20} />
          Tambah Wilayah
        </Link>

      </div>

      {/* SEARCH */}

      <form>

        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="q"
            defaultValue={keyword}
            placeholder="Cari wilayah..."
            className="w-full rounded-xl border pl-12 pr-4 py-3 outline-none focus:border-emerald-500"
          />

        </div>

      </form>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                No
              </th>

              <th className="p-4 text-left">
                Wilayah
              </th>

              <th className="p-4 text-left">
                Kecamatan
              </th>

              <th className="p-4 text-center">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {regions.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="py-16 text-center"
                >
                  <MapPinned
                    size={50}
                    className="mx-auto mb-3 text-gray-300"
                  />

                  <p className="text-gray-500">
                    Belum ada wilayah.
                  </p>

                </td>

              </tr>

            ) : (

              regions.map((region, index) => (

                <tr
                  key={region.id}
                  className="border-t"
                >
                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4 font-semibold">
                    {region.name}
                  </td>

                  <td className="p-4">
                    {region.district}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        href={`/dashboard/admin/wilayah/edit/${region.id}`}
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                      >
                        <Pencil size={18} />
                      </Link>

                      <form
                        action={async () => {
                          "use server";
                          await deleteRegion(region.id);
                        }}
                      >
                        <button
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}