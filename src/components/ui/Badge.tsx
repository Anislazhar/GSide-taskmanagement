import React from "react";
import { TaskStatus } from "../../features/tasks/tasks.types";

export default function Badge({ status }: { status: TaskStatus }) {
  const cls =
    status === "Done"
      ? "bg-green-100 text-green-800"
      : status === "Escalated"
      ? "bg-red-100 text-red-800"
      : "bg-blue-100 text-blue-800";
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${cls}`}>
      {status}
    </span>
  );
}
