import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import {
  markDone,
  escalate,
  skip,
  updateBirthdate,
  setIndex,
  incrementPoints,
} from "../../features/tasks/tasksSlice";
import { CheckCircle } from "lucide-react";
import PatientInfoCard from "../ui/PatientInfoCard";
import BirthdateForm from "../ui/BirthdateForm";
import TaskButtons from "../ui/TaskButtons";
import Sidebar from "../ui/Sidebarcard";
import StatsGrid from "../ui/StatsGrid";

export default function TaskDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, index } = useSelector((s: RootState) => s.tasks);

  const taskIndex = tasks.findIndex((t) => t.id === id);
  const task = taskIndex >= 0 ? tasks[taskIndex] : tasks[index];

  const [birthdate, setBirthdate] = useState(task?.birthdate ?? "");
  const pointsPerTask = 15;

  const stats = [
    { label: "Fee regulation", value: "3/4" },
    { label: "Tariff regulation", value: "0/2" },
    { label: "Scorepoints", value: pointsPerTask },
    { label: "Skilllevel", value: "Basis", color: "text-blue-600" },
  ];

  useEffect(() => {
    if (taskIndex >= 0) dispatch(setIndex(taskIndex));
    setBirthdate(task?.birthdate ?? "");
  }, [taskIndex, task, dispatch]);

  if (!task) return <div className="p-6">No task selected</div>;

  const goNext = () => {
    const nextIndex = (index + 1) % tasks.length;
    dispatch(setIndex(nextIndex));
    navigate(`/task/${tasks[nextIndex].id}`);
  };

  const handleValidate = () => {
    dispatch(updateBirthdate({ id: task.id, birthdate }));
    dispatch(markDone({ id: task.id }));
    dispatch(incrementPoints(pointsPerTask));
    goNext();
  };

  const handleUpdateBirthdate = () => {
    dispatch(updateBirthdate({ id: task.id, birthdate }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h2 className="text-blue-800 font-semibold text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Please check the patient's age
            </h2>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Rule 334: The GOZ 2000 can only be billed from ages 7 to 18. For
              insured persons under the age of 6, only billable if the 6-year
              molar erupts prematurely.
            </p>
          </div>

          <PatientInfoCard task={task} />

          <BirthdateForm
            birthdate={birthdate}
            setBirthdate={setBirthdate}
            onSave={handleUpdateBirthdate}
          />

          <TaskButtons
            onValidate={handleValidate}
            onEscalate={() => {
              dispatch(escalate({ id: task.id }));
              goNext();
            }}
            onSkip={() => {
              dispatch(skip());
              goNext();
            }}
          />
          <StatsGrid stats={stats} />
        </div>
        <Sidebar tasks={tasks} pointsPerTask={pointsPerTask} />
      </div>
    </div>
  );
}
