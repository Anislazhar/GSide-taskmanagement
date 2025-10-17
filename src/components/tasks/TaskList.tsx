import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import {
  setTasks,
  setIndex,
  restartQueue,
} from "../../features/tasks/tasksSlice";
import { Task } from "../../features/tasks/tasks.types";
import ContactCard from "../ui/ContactCard";
import SearchFilterBar from "../ui/SearchFilterBar";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, index } = useSelector((s: RootState) => s.tasks);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "New" | "Done" | "Escalated">(
    "All"
  );

  useEffect(() => {
    fetch("/tasks.json")
      .then((r) => r.json())
      .then((data: Task[]) => dispatch(setTasks(data)))
      .catch(() => dispatch(setTasks([])));
  }, [dispatch]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const counts = { New: 0, Done: 0, Escalated: 0 };
    tasks.forEach((t) => counts[t.status]++);
    return { total, counts };
  }, [tasks]);

  const filtered = tasks.filter(
    (t) =>
      (filter === "All" || t.status === filter) &&
      `${t.contractNumber} ${t.name}`
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <SearchFilterBar
              query={query}
              filter={filter}
              onQueryChange={setQuery}
              onFilterChange={(f) => setFilter(f as any)}
              onRestart={() => dispatch(restartQueue())}
            />

            <div className="flex flex-col space-y-3 overflow-y-auto max-h-[360px] scrollbar-thin scrollbar-thumb-gray-300">
              {filtered.map((t, idx) => (
                <ContactCard
                  key={t.id}
                  task={t}
                  isActive={idx === index}
                  onOpen={() => dispatch(setIndex(idx))}
                />
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-gray-700 font-semibold mb-2">
              Queue Statistics
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Total: {stats.total}</li>
              <li>New: {stats.counts.New}</li>
              <li>Done: {stats.counts.Done}</li>
              <li>Escalated: {stats.counts.Escalated}</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TaskList;
