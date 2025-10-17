import React from "react";
import StatCard from "./StatCard";

interface Stat {
  label: string;
  value: string | number;
  color?: string;
}

interface Props {
  stats: Stat[];
}

export default function StatsGrid({ stats }: Props) {
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {stats.map((stat, i) => (
        <StatCard
          key={i}
          label={stat.label}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
}
