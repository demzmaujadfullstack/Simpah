"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteUserProps {
  userId: string;
  userName: string;
}

export default function DeleteUser({
  userId,
  userName,
}: DeleteUserProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus user");
      }

      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Gagal menghapus user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Tombol Hapus */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-600 hover:text-red-800"
        title="Hapus User"
      >
        <Trash2 size={18} />
      </button>

      {/* Modal Konfirmasi */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-red-600">
              Hapus User?
            </h2>

            <p className="mt-2 text-slate-600">
              Apakah Anda yakin ingin menghapus user{" "}
              <span className="font-semibold">{userName}</span>?
              <br />
              <span className="text-sm text-red-500">
                Tindakan ini tidak dapat dibatalkan!
              </span>
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border px-4 py-2 hover:bg-slate-50"
                disabled={isLoading}
              >
                Batal
              </button>

              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}