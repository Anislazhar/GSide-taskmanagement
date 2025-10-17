import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import {
  setTasks,
  setIndex,
  restartQueue,
} from "../../features/tasks/tasksSlice";
import { Task } from "../../features/tasks/tasks.types";
import SearchFilterBar from "../ui/SearchFilterBar";
import DashboardCounters from "./DashboardCounters";
import TaskStatsCard from "./TaskStatsCard";
import TaskGrid from "./TaskGrid";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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

  const handleSelect = (idx: number) => {
    dispatch(setIndex(idx));
    navigate(`/task/${filtered[idx].id}`);
  };

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
            <TaskGrid
              tasks={filtered}
              activeIndex={index}
              onSelect={handleSelect}
            />
          </div>
        </div>

        <aside className="lg:col-span-2 xl:col-span-1 flex flex-col space-y-6">
          <DashboardCounters />
          <TaskStatsCard stats={stats} />
        </aside>
      </div>
    </div>
  );
};

export default TaskList;
