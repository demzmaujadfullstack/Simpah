"use client";

import { Trash2 } from "lucide-react";
import { deleteWasteCategory } from "@/actions/waste-category.action";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  name: string;
}

export default function DeleteButton({ id, name }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Yakin ingin menghapus "${name}"?`)) return;

    try {
      await deleteWasteCategory(id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Gagal menghapus data");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-500 p-2 text-white transition hover:bg-red-600"
    >
      <Trash2 size={16} />
    </button>
  );
}