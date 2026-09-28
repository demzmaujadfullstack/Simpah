"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  createRegion,
  updateRegion,
} from "@/actions/region.action";

interface RegionFormProps {
  region?: {
    id: string;
    name: string;
    district: string;
  };
}

export default function RegionForm({
  region,
}: RegionFormProps) {
  const router = useRouter();

  const [name, setName] = useState(region?.name ?? "");
  const [district, setDistrict] = useState(
    region?.district ?? "Tanjung Priok"
  );

  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleSubmit() {
    setError("");

    startTransition(async () => {
      try {
        if (region) {
          await updateRegion(
            region.id,
            name,
            district
          );
        } else {
          await createRegion(
            name,
            district
          );
        }

        router.push("/dashboard/admin/wilayah");
        router.refresh();
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Terjadi kesalahan.");
        }
      }
    });
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg border">

      <h1 className="mb-6 text-3xl font-bold">
        {region
          ? "Edit Wilayah"
          : "Tambah Wilayah"}
      </h1>

      {error && (
        <div className="mb-5 rounded-xl bg-red-100 border border-red-300 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-5">

        <div>
          <label className="mb-2 block font-medium">
            Nama Wilayah
          </label>

          <input
            type="text"
            placeholder="Contoh : Sunter"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Kecamatan
          </label>

          <input
            type="text"
            value={district}
            onChange={(e) =>
              setDistrict(e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border px-6 py-3 hover:bg-gray-100"
          >
            Batal
          </button>

          <button
            type="button"
            disabled={isPending}
            onClick={handleSubmit}
            className="rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
          >
            {isPending
              ? "Menyimpan..."
              : region
              ? "Update Wilayah"
              : "Simpan Wilayah"}
          </button>

        </div>

      </div>
    </div>
  );
}