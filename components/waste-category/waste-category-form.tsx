"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  createWasteCategory,
  updateWasteCategory,
} from "@/actions/waste-category.action";

type Props = {
  id?: string;
  defaultName?: string;
  defaultPoint?: number;
};

export default function WasteCategoryForm({
  id,
  defaultName = "",
  defaultPoint = 0,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState(defaultName);
  const [point, setPoint] = useState(defaultPoint);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama sampah wajib diisi.");
      return;
    }

    if (point < 0) {
      alert("Point tidak boleh kurang dari 0.");
      return;
    }

    setLoading(true);

    try {
      if (id) {
        await updateWasteCategory(id, name, Number(point));
      } else {
        await createWasteCategory(name, Number(point));
      }

      router.push("/dashboard/admin/sampah");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Nama Jenis Sampah
        </label>

        <input
          type="text"
          placeholder="Contoh: Botol Plastik"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Poin per Kg
        </label>

        <input
          type="number"
          min={0}
          value={point}
          onChange={(e) => setPoint(Number(e.target.value))}
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border px-5 py-3 hover:bg-gray-100"
        >
          Batal
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          {loading
            ? "Menyimpan..."
            : id
            ? "Update"
            : "Simpan"}
        </button>
      </div>
    </form>
  );
}