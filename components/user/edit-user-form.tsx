"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Region, Role } from "@prisma/client";

interface EditUserFormProps {
  user: User;
  regions: Region[];
}

export default function EditUserForm({ user, regions }: EditUserFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError("");

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as Role;
    const regionId = formData.get("regionId") as string;

    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password: password || undefined,
          role,
          regionId: regionId || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengupdate user");
      }

      router.push("/dashboard/admin/users");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Terjadi kesalahan saat mengupdate user");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Nama */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Nama Lengkap <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={user.name}
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            defaultValue={user.email}
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700">
            Password (Kosongkan jika tidak diubah)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            minLength={6}
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Masukkan password baru"
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-slate-700">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            name="role"
            required
            defaultValue={user.role}
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="ADMIN">Admin</option>
            <option value="PETUGAS">Petugas</option>
            <option value="WARGA">Warga</option>
          </select>
        </div>

        {/* Wilayah */}
        <div className="md:col-span-2">
          <label htmlFor="regionId" className="block text-sm font-medium text-slate-700">
            Wilayah
          </label>
          <select
            id="regionId"
            name="regionId"
            defaultValue={user.regionId || ""}
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Pilih Wilayah (Opsional)</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name} - {region.district}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tombol */}
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
          className="rounded-lg bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}