import { ReactNode } from "react";

interface StatisticCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export default function StatisticCard({
  title,
  value,
  icon,
}: StatisticCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-teal-100 p-4 text-teal-600">
          {icon}
        </div>
      </div>
    </div>
  );
}