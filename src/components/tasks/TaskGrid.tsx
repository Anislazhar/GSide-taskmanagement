import React from "react";
import ContactCard from "../ui/ContactCard";
import { Task } from "../../features/tasks/tasks.types";

interface Props {
  tasks: Task[];
  activeIndex: number;
  onSelect: (idx: number) => void;
}

const TaskGrid: React.FC<Props> = ({ tasks, activeIndex, onSelect }) => (
  <div className="flex flex-col space-y-3 overflow-y-auto max-h-[360px] scrollbar-thin scrollbar-thumb-gray-300">
    {tasks.map((task, idx) => (
      <ContactCard
        key={task.id}
        task={task}
        isActive={idx === activeIndex}
        onOpen={() => onSelect(idx)}
      />
    ))}
  </div>
);

export default TaskGrid;
