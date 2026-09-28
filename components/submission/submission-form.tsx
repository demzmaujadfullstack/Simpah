"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { WasteCategory } from "@prisma/client";
import { Upload, X, Loader2 } from "lucide-react";

interface SubmissionFormProps {
  userId: string;
  regionId: string;
  categories: WasteCategory[];
}

export default function SubmissionForm({
  userId,
  regionId,
  categories,
}: SubmissionFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError("");

    const categoryId = formData.get("categoryId") as string;
    const weight = formData.get("weight") as string;

    if (!categoryId || !weight || !selectedFile) {
      setError("Semua field wajib diisi termasuk foto");
      setIsLoading(false);
      return;
    }

    // Upload file ke server
    const uploadFormData = new FormData();
    uploadFormData.append("file", selectedFile);
    uploadFormData.append("userId", userId);
    uploadFormData.append("regionId", regionId);
    uploadFormData.append("categoryId", categoryId);
    uploadFormData.append("weight", weight);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal mengirim setoran");
      }

      router.push("/dashboard/warga/submissions");
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Kategori Sampah */}
        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700">
            Kategori Sampah <span className="text-red-500">*</span>
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name} (Poin: {category.point}/Kg)
              </option>
            ))}
          </select>
        </div>

        {/* Berat Sampah */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-slate-700">
            Berat (Kg) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            required
            min="0.1"
            step="0.1"
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Contoh: 2.5"
          />
          <p className="mt-1 text-sm text-slate-500">Masukkan berat sampah dalam kilogram</p>
        </div>
      </div>

      {/* Upload Foto */}
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Foto Sampah <span className="text-red-500">*</span>
        </label>
        <div className="mt-1">
          {!previewUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-8 hover:border-emerald-500"
            >
              <Upload className="h-10 w-10 text-slate-400" />
              <p className="mt-2 text-sm text-slate-500">
                Klik untuk upload foto sampah
              </p>
              <p className="text-xs text-slate-400">JPG, PNG, JPEG (Max 5MB)</p>
            </div>
          ) : (
            <div className="relative">
              <Image
                src={previewUrl}
                alt="Preview sampah"
                width={500}
                height={300}
                className="max-h-64 w-full rounded-lg object-contain border"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <X size={18} />
              </button>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
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
          disabled={isLoading || !selectedFile}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Mengirim...
            </>
          ) : (
            "Kirim Setoran"
          )}
        </button>
      </div>
    </form>
  );
}