"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface VerifikasiButtonsProps {
  submissionId: string;
  userId: string;
  point: number;
}

type StatusType = "VERIFIED" | "REJECTED";

export default function VerifikasiButtons({
  submissionId,
  userId,
  point,
}: VerifikasiButtonsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifikasi = async (status: StatusType) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/submissions/${submissionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          userId,
          point,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal memverifikasi");
      }

      router.refresh();
      router.push("/dashboard/petugas/submissions");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => handleVerifikasi("VERIFIED")}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <CheckCircle size={18} />
          )}
          Verifikasi
        </button>

        <button
          onClick={() => handleVerifikasi("REJECTED")}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <XCircle size={18} />
          )}
          Tolak
        </button>
      </div>

      <p className="text-center text-xs text-slate-500">
        Status tidak dapat diubah setelah diverifikasi
      </p>
    </div>
  );
}