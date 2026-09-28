import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getWasteCategoryById } from "@/actions/waste-category.action";
import WasteCategoryForm from "@/components/waste-category/waste-category-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditWasteCategoryPage({
  params,
}: Props) {
  const { id } = await params;

  const category = await getWasteCategoryById(id);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/admin/sampah"
          className="rounded-lg border p-2 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold">
            Edit Jenis Sampah
          </h1>

          <p className="text-gray-500">
            Ubah data jenis sampah.
          </p>
        </div>
      </div>

      <WasteCategoryForm
        id={category.id}
        defaultName={category.name}
        defaultPoint={category.point}
      />
    </div>
  );
}