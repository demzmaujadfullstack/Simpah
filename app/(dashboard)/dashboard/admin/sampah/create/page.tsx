import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import WasteCategoryForm from "@/components/waste-category/waste-category-form";

export default function CreateWasteCategoryPage() {
  return (
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/admin/sampah"
          className="flex h-10 w-10 items-center justify-center rounded-xl border bg-white hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold">
            Tambah Jenis Sampah
          </h1>

          <p className="text-gray-500">
            Isi form di bawah untuk menambahkan jenis sampah baru.
          </p>
        </div>
      </div>

      {/* Form */}
      <WasteCategoryForm />
    </div>
  );
}