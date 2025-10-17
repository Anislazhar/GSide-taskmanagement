import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../app/store";
import {
  markDone,
  escalate,
  updateBirthdate,
  setIndex,
} from "../../features/tasks/tasksSlice";
import { CheckCircle, ArrowRight } from "lucide-react";
import DashboardCounters from "./DashboardCounters";

export default function TaskDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, index } = useSelector((s: RootState) => s.tasks);
  const taskIndex = tasks.findIndex((t) => t.id === id);
  const task = taskIndex >= 0 ? tasks[taskIndex] : tasks[index];
  const [birthdate, setBirthdate] = useState(task?.birthdate ?? "");

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="xl:col-span-2">
          {/* Header */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-2">
            <h2 className="text-blue-800 font-semibold text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Please check the patient's age
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Rule 334: The GOZ 2000 can only be billed from ages 7 to 18. For
              insured persons under the age of 6, only billable if the 6-year
              molar erupts prematurely.
            </p>
          </div>

          {/* Patient Info Card */}
          <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-800">
                Excerpt from the patient file
              </h3>
              <button
                onClick={() => navigate("/")}
                className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
              >
                to the contract <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">Insured person</p>
                  <p className="font-semibold text-gray-900">
                    {task.name || "First name Last name"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm">Insurance number</p>
                  <p className="font-semibold text-gray-900">
                    {task.contractNumber || "14940481"}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 text-sm">
                <div>
                  <p className="text-gray-500">Gender</p>
                  <p>{task.sex || "männlich"}</p>
                </div>
                <div>
                  <p className="text-gray-500">Birthdate</p>
                  <p>{task.birthdate || "15.01.1980"}</p>
                </div>
                <div>
                  <p className="text-gray-500">VP-Nr.</p>
                  <p>{task.id || "01"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Telephone number</p>
                  <p>0711-7372 7777</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Address</p>
                  <p>
                    {task.address || "Schönhauser Allee 94, 79874 Breitnau"}
                  </p>
                </div>
              </div>
            </div>

            {/* Add Missing Info */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-1">
                Add missing information
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Add missing information"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                  Save
                </button>
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="border rounded-lg p-3">
                <p className="text-sm text-gray-500">Fee regulation</p>
                <p className="font-semibold text-gray-800">3/4</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-gray-500">Tariff regulation</p>
                <p className="font-semibold text-gray-800">0/2</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-gray-500">Scorepoints</p>
                <p className="font-semibold text-gray-800">15</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-gray-500">Skilllevel</p>
                <p className="font-semibold text-blue-600">Basis</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-3">
              <button
                className="text-red-500 text-sm hover:underline"
                onClick={() => {
                  dispatch(escalate({ id: task.id }));
                  goNext();
                }}
              >
                ✕ Reject task
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                onClick={() => {
                  dispatch(updateBirthdate({ id: task.id, birthdate }));
                  dispatch(markDone({ id: task.id }));
                  goNext();
                }}
              >
                ✓ Task completed
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Score Card */}

          <DashboardCounters />

          {/* Recently Completed Tasks */}
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
                  className="flex justify-between border border-blue-200 rounded-md px-3 py-2 hover:bg-blue-50"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    {task}
                  </span>
                  <span className="text-gray-400 text-xs">
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
      </div>
    </div>
  );
}
