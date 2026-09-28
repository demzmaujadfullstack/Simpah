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
} from "lucide-react";
import StatusBadge from "@/components/submission/status-badge";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminSubmissionDetailPage({ params }: Props) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const { id } = await params;

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

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/dashboard/admin/submissions"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali ke Daftar Setoran
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Detail Setoran */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-800">Detail Setoran</h2>
              <StatusBadge status={submission.status} />
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3">
                <User size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Nama Warga</p>
                  <p className="font-medium text-slate-800">{submission.user.name}</p>
                  <p className="text-sm text-slate-500">{submission.user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Tanggal Setor</p>
                  <p className="font-medium text-slate-800">
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
                  <p className="font-medium text-slate-800">{submission.category.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <p className="text-sm text-slate-500">Berat</p>
                  <p className="font-medium text-slate-800">{submission.weight} Kg</p>
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
                  <p className="font-medium text-slate-800">{submission.region.name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Foto */}
        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Foto Sampah</h2>
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

          {/* Informasi User */}
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">Info Warga</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Nama</span>
                <span className="font-medium text-slate-800">{submission.user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-800">{submission.user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Poin</span>
                <span className="font-medium text-emerald-600">{submission.user.totalPoint}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}