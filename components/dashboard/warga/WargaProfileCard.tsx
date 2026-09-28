interface WargaProfileCardProps {
  name: string;
  email: string;
  role: string;
  regionName?: string | null;
  createdAt: Date;
}

export default function WargaProfileCard({
  name,
  email,
  role,
  regionName,
  createdAt,
}: WargaProfileCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{name}</h3>
            <p className="text-sm text-slate-500">{email}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <div>
            <span className="text-slate-500">Role:</span>
            <span className="ml-1 font-medium text-slate-700">{role}</span>
          </div>
          {regionName && (
            <div>
              <span className="text-slate-500">Wilayah:</span>
              <span className="ml-1 font-medium text-slate-700">{regionName}</span>
            </div>
          )}
          <div>
            <span className="text-slate-500">Bergabung:</span>
            <span className="ml-1 font-medium text-slate-700">
              {createdAt.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}