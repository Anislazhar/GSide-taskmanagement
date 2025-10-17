import { Task } from "../../features/tasks/tasks.types";

export default function TaskCard({ task }: { task: Task }) {
  const statusColor =
    task.status === "New"
      ? "bg-amber-100 text-amber-800"
      : task.status === "Done"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  return (
    <div className="p-3 mb-2 bg-white rounded shadow-sm flex justify-between items-center">
      <div>
        <div className="text-sm font-medium">
          {task.contractNumber} — {task.name}
        </div>
        <div className="text-xs text-slate-500">{task.address}</div>
      </div>
      <div className={`px-2 py-1 rounded text-xs ${statusColor}`}>
        {task.status}
      </div>
    </div>
  );
}
