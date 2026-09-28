import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Package, Award, MapPin, User } from "lucide-react";
import StatusBadge from "@/components/submission/status-badge";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function WargaSubmissionDetailPage({ params }: Props) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { id } = await params;

  // ✅ PAKAI SELECT (lebih cepat dari include)
  const submission = await prisma.submission.findUnique({
    where: { id },
    select: {
      id: true,
      weight: true,
      point: true,
      status: true,
      photo: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      region: {
        select: {
          id: true,
          name: true,
        },
      },
      fotoSampah: {
        select: {
          id: true,
          url: true,
        },
      },
    },
  });

  if (!submission) {
    notFound();
  }

  // Pastikan hanya pemilik yang bisa lihat
  if (submission.userId !== session.user.id) {
    redirect("/dashboard/warga/submissions");
  }

  // ✅ Ambil URL foto dari fotoSampah atau fallback ke photo
  const fotoUrl = submission.fotoSampah?.url || submission.photo;

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/warga/submissions"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-600"
      >
        <ArrowLeft size={18} />
        Kembali
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
                <Calendar size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Tanggal Setor</p>
                  <p className="font-medium text-slate-800">
                    {new Date(submission.createdAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Package size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Kategori</p>
                  <p className="font-medium text-slate-800">{submission.category?.name || "-"}</p>
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
                  <p className="font-medium text-slate-800">{submission.region?.name || "-"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User size={20} className="text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Disetor oleh</p>
                  <p className="font-medium text-slate-800">{submission.user?.name || "-"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Foto */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">Foto Sampah</h2>
          <div className="mt-4 relative aspect-square w-full">
            <Image
              src={fotoUrl}
              alt="Foto sampah"
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized={fotoUrl.startsWith("blob:")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}