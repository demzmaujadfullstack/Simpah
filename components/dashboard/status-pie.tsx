"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS: Record<string, string> = {
  PENDING: "#f59e0b",
  VERIFIED: "#10b981",
  REJECTED: "#ef4444",
};

const LABELS: Record<string, string> = {
  PENDING: "Menunggu",
  VERIFIED: "Diverifikasi",
  REJECTED: "Ditolak",
};

export default function StatusPie({ data }: Props) {
  const hasData = data.some((item) => item.value > 0);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const formattedData = data.map((item) => ({
    ...item,
    percentage: total > 0 ? Math.round((item.value / total) * 100) : 0,
  }));

  // Label renderer
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderLabel = (entry: any) => {
    const { percent } = entry;
    return `${(percent * 100).toFixed(0)}%`;
  };

  // Tooltip formatter
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatTooltip = (value: any) => {
    if (typeof value === 'number') {
      return `${value} setoran`;
    }
    return value;
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200/50">
      <h2 className="mb-6 text-lg font-semibold text-slate-800">
        ♻️ Status Setoran
      </h2>

      {!hasData ? (
        <div className="flex h-64 items-center justify-center text-slate-500">
          Belum ada data setoran
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label={renderLabel}
              labelLine={false}
            >
              {formattedData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name] || "#94a3b8"}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={formatTooltip}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend
              formatter={(value: string) => LABELS[value] || value}
              verticalAlign="bottom"
              height={36}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}