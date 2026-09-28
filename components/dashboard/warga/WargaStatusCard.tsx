import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusData {
  label: string;
  count: number;
  percentage: number;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

interface WargaStatusCardProps {
  verifiedCount: number;
  pendingCount: number;
  rejectedCount: number;
  total: number;
}

export default function WargaStatusCard({
  verifiedCount,
  pendingCount,
  rejectedCount,
  total,
}: WargaStatusCardProps) {
  const verifiedPercentage = total > 0 ? Math.round((verifiedCount / total) * 100) : 0;
  const pendingPercentage = total > 0 ? Math.round((pendingCount / total) * 100) : 0;
  const rejectedPercentage = total > 0 ? Math.round((rejectedCount / total) * 100) : 0;

  const statuses: StatusData[] = [
    {
      label: "Diverifikasi",
      count: verifiedCount,
      percentage: verifiedPercentage,
      icon: <CheckCircle size={20} className="text-green-600" />,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
    },
    {
      label: "Menunggu",
      count: pendingCount,
      percentage: pendingPercentage,
      icon: <Clock size={20} className="text-yellow-600" />,
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
    },
    {
      label: "Ditolak",
      count: rejectedCount,
      percentage: rejectedPercentage,
      icon: <XCircle size={20} className="text-red-600" />,
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {statuses.map((status) => (
        <div
          key={status.label}
          className={`rounded-2xl border ${status.borderColor} ${status.bgColor} p-6`}
        >
          <div className="flex items-center gap-2">
            {status.icon}
            <p className={`text-sm font-medium ${status.textColor}`}>
              {status.label}
            </p>
          </div>
          <h3 className={`mt-2 text-2xl font-bold ${status.textColor}`}>
            {status.count}
          </h3>
          <p className={`text-sm ${status.textColor}`}>
            {status.percentage}% dari total
          </p>
        </div>
      ))}
    </div>
  );
}