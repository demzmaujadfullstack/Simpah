"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

interface DeleteRewardButtonProps {
  rewardId: string;
  rewardName: string;
}

export default function DeleteRewardButton({
  rewardId,
  rewardName,
}: DeleteRewardButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Hapus reward "${rewardName}"?`)) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/rewards/${rewardId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus reward");
      }

      router.refresh();
    } catch (error) {
      alert("Gagal menghapus reward");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isLoading}
      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Trash2 size={18} />
      )}
    </button>
  );
}