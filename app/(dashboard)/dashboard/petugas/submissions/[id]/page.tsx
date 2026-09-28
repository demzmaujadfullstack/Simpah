import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Package,
  Award,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import StatusBadge from "@/components/submission/status-badge";
import VerifikasiButtons from "@/components/submission/verifikasi-buttons";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PetugasSubmissionDetailPage({ params }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  // Ambil data petugas
  const petugas = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { region: true },
  });

  if (!petugas) {
    redirect("/login");
  }

  // Ambil submission
  const submission = await prisma.submission.findUnique({
    where: { id },
    include: {
      user: true,
      category: true,
      region: true,
    },
  });

  if (!submission) {
    notFound();
  }

  // Cek apakah petugas punya akses ke submission ini
  if (petugas.regionId && submission.regionId !== petugas.regionId) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/petugas/submissions"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft size={18} />
          Kembali
        </Link>
        <div className="rounded-2xl border bg-red-50 p-8 text-center">
          <h2 className="text-xl font-bold text-red-700">Akses Ditolak</h2>
          <p className="mt-2 text-red-600">
            Anda tidak memiliki akses ke setoran ini karena berbeda wilayah.
          </p>
        </div>
      </div>
    );
  }

  // Cek apakah sudah diverifikasi
  const isVerified = submission.status !== "PENDING";

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/petugas/submissions"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft size={18} />
        Kembali
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Detail Setoran */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Detail Setoran</h2>
              <StatusBadge status={submission.status} />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <User size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Nama Warga</p>
                  <p className="font-medium">{submission.user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Tanggal Setor</p>
                  <p className="font-medium">
                    {submission.createdAt.toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Package size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Kategori</p>
                  <p className="font-medium">{submission.category.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm text-slate-500">Berat</p>
                  <p className="font-medium">{submission.weight} Kg</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Award size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Poin</p>
                  <p className="font-medium text-emerald-600">+{submission.point}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Wilayah</p>
                  <p className="font-medium">{submission.region.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informasi Verifikasi (jika sudah) */}
          {isVerified && (
            <div className={`rounded-2xl border p-6 ${
              submission.status === "VERIFIED" 
                ? "border-green-200 bg-green-50" 
                : "border-red-200 bg-red-50"
            }`}>
              <div className="flex items-center gap-3">
                {submission.status === "VERIFIED" ? (
                  <CheckCircle size={24} className="text-green-600" />
                ) : (
                  <XCircle size={24} className="text-red-600" />
                )}
                <div>
                  <p className={`font-semibold ${
                    submission.status === "VERIFIED" 
                      ? "text-green-700" 
                      : "text-red-700"
                  }`}>
                    {submission.status === "VERIFIED" 
                      ? "Setoran Diverifikasi ✓" 
                      : "Setoran Ditolak ✗"}
                  </p>
                  <p className="text-sm text-slate-600">
                    Status ini sudah final dan tidak dapat diubah.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Foto & Aksi */}
        <div className="space-y-6">
          {/* Foto */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Foto Sampah</h2>
            <div className="mt-4 relative aspect-square w-full">
              <Image
                src={submission.photo}
                alt="Foto sampah"
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>

          {/* Tombol Aksi (hanya jika masih PENDING) */}
          {!isVerified && (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">Verifikasi</h2>
              <p className="mt-1 text-sm text-slate-500">
                Pastikan foto dan data sesuai sebelum memverifikasi.
              </p>
              <div className="mt-4 space-y-3">
                <VerifikasiButtons 
                  submissionId={submission.id}
                  userId={submission.userId}
                  point={submission.point}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}