"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Gift } from "lucide-react";

export default function CreateRewardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    pointCost: "",
    stock: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/rewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description || null,
          pointCost: parseInt(formData.pointCost),
          stock: parseInt(formData.stock),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal membuat reward");
      }

      router.push("/dashboard/admin/rewards");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/admin/rewards"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-slate-800">🎁 Tambah Reward</h1>
        <p className="text-slate-500">Buat reward baru untuk ditukar warga</p>
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Nama Reward */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Nama Reward <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none"
              placeholder="Contoh: Voucher 10K"
              required
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none"
              placeholder="Deskripsi reward (opsional)"
              rows={3}
            />
          </div>

          {/* Poin yang dibutuhkan */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Poin yang dibutuhkan <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="pointCost"
              value={formData.pointCost}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none"
              placeholder="Contoh: 100"
              min="1"
              required
            />
          </div>

          {/* Stok */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Stok <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none"
              placeholder="Contoh: 50"
              min="1"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 border-t pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border px-6 py-2 hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              <Gift size={18} />
              {isLoading ? "Menyimpan..." : "Simpan Reward"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}