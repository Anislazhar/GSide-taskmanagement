import { CheckCircle } from "lucide-react";
import DashboardCounters from "../tasks/DashboardCounters";

interface Task {
  id: string;
  name?: string;
  status?: string;
}

interface Props {
  tasks: Task[];
  pointsPerTask: number;
}

export default function Sidebar({ tasks, pointsPerTask }: Props) {
  return (
    <aside className="space-y-6">
      <DashboardCounters />

      <div className="bg-white border border-blue-300 rounded-xl shadow-sm p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">
          Recently completed tasks
        </h3>
        <ul className="space-y-2 text-sm">
          {tasks
            .filter((t) => t.status === "done")
            .slice(-5)
            .map((t) => (
              <li
                key={t.id}
                className="flex justify-between border border-blue-200 rounded-md px-3 py-2 hover:bg-blue-50"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  {t.name || "Completed Task"}
                </span>
                <span className="text-gray-400 text-xs">
                  {new Date().toLocaleDateString()}
                </span>
              </li>
            ))}
        </ul>
        <div className="flex justify-between mt-3 text-xs text-blue-600">
          <button className="hover:underline">‹ Older Tasks</button>
          <button className="hover:underline">New Tasks ›</button>
        </div>
      </div>
    </aside>
  );
}
