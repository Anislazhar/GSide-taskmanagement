import React from "react";

interface Props {
  label: string;
  value: string | number;
  color?: string; // optional text color
}

export default function StatCard({
  label,
  value,
  color = "text-gray-800",
}: Props) {
  return (
    <div className="border rounded-lg p-3">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-semibold ${color}`}>{value}</p>
    </div>
  );
}
