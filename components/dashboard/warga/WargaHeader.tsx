import Link from "next/link";
import { MapPin, Plus } from "lucide-react";

interface WargaHeaderProps {
  name: string;
  regionName?: string | null;
}

export default function WargaHeader({ name, regionName }: WargaHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Warga</h1>
        <p className="mt-1 text-slate-500">
          Selamat datang, <span className="font-semibold">{name}</span>
          {regionName && (
            <span className="ml-1 inline-flex items-center gap-1">
              <MapPin size={14} className="text-emerald-600" />
              <span className="text-emerald-600">{regionName}</span>
            </span>
          )}
        </p>
      </div>
      <Link
        href="/dashboard/warga/submissions/create"
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 hover:shadow-md"
      >
        <Plus size={20} />
        Setor Sampah
      </Link>
    </div>
  );
}