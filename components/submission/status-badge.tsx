import { SubmissionStatus } from "@prisma/client";

interface StatusBadgeProps {
  status: SubmissionStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusMap = {
    PENDING: {
      label: "Menunggu Verifikasi",
      className: "bg-yellow-100 text-yellow-700",
    },
    VERIFIED: {
      label: "Diverifikasi",
      className: "bg-green-100 text-green-700",
    },
    REJECTED: {
      label: "Ditolak",
      className: "bg-red-100 text-red-700",
    },
  };

  const { label, className } = statusMap[status];

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}