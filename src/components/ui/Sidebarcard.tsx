import { ClipboardCheck } from "lucide-react";
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
          {[
            "Check tooth information",
            "Number of implants billed",
            "Malaria drugs as prophylaxis",
          ].map((task, i) => (
            <li
              key={i}
              className="flex justify-between border bg-blue-100 rounded-md px-3 py-2"
            >
              <span className="flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-blue-600" />
                {task}
              </span>
              <span className="text-gray-400 text-sm">
                19.10.2023, {13 + i}:00
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
