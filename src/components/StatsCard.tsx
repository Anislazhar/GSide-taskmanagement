import React from "react";

export default function StatsCard({ stats }: any) {
  const total = stats.total || 0;
  const byStatus = stats.byStatus || {};
  return (
    <div className="bg-white border rounded p-3 shadow-sm flex justify-between items-center">
      <div>
        <div className="text-xs text-slate-500">Total</div>
        <div className="text-lg font-semibold">{total}</div>
      </div>
      <div className="text-right">
        {Object.entries(byStatus).map(([k, v]) => {
          const pct = total ? Math.round(((v as number) / total) * 100) : 0;
          return (
            <div key={k} className="text-sm">
              <span className="font-medium">{k}</span>: {v as number} — {pct}%
            </div>
          );
        })}
      </div>
    </div>
  );
}
