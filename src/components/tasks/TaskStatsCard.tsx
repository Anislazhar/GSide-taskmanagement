import React from "react";

interface Stats {
  total: number;
  counts: { New: number; Done: number; Escalated: number };
}

const TaskStatsCard: React.FC<{ stats: Stats }> = ({ stats }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
    <h4 className="text-gray-700 font-semibold mb-2">Queue Statistics</h4>
    <ul className="text-sm text-gray-600 space-y-1">
      <li>Total: {stats.total}</li>
      <li>New: {stats.counts.New}</li>
      <li>Done: {stats.counts.Done}</li>
      <li>Escalated: {stats.counts.Escalated}</li>
    </ul>
  </div>
);

export default TaskStatsCard;
