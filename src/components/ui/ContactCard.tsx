import React from "react";
import Badge from "../ui/Badge";
import { Task } from "../../features/tasks/tasks.types";

interface ContactCardProps {
  task: Task;
  isActive?: boolean;
  onOpen: () => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  task,
  isActive,
  onOpen,
}) => {
  return (
    <article
      className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 
      border rounded-xl transition-all duration-200 
      ${
        isActive
          ? "bg-indigo-50 border-indigo-400"
          : "hover:bg-gray-50 border-gray-200"
      }
      shadow-sm hover:shadow-md cursor-pointer`}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
        <div className="flex flex-col">
          <h3 className="font-semibold text-gray-800 text-base sm:text-lg leading-tight">
            {task.contractNumber} — {task.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{task.address}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 ">
        <Badge status={task.status} />
        <button
          className="text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2 border border-indigo-500 
          text-indigo-600 rounded-lg hover:bg-indigo-50 active:bg-indigo-100 transition-all"
        >
          Open
        </button>
      </div>
    </article>
  );
};

export default ContactCard;
