interface Props {
  logs: {
    id: string;
    action: string;
    description: string;
    createdAt: Date;
  }[];
}

export default function RecentActivity({
  logs,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">
        Aktivitas Terbaru
      </h2>

      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="border-b pb-3"
          >
            <h3 className="font-semibold">
              {log.action}
            </h3>

            <p className="text-gray-500 text-sm">
              {log.description}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              {new Date(
                log.createdAt
              ).toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}