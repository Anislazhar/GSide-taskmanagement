import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Task {
  id: string;
  name?: string;
  contractNumber?: string;
  sex?: string;
  birthdate?: string;
  address?: string;
}

interface Props {
  task: Task;
}

export default function PatientInfoCard({ task }: Props) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-800">
          Excerpt from the patient file
        </h3>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 text-sm flex items-center gap-1 hover:underline transition-all"
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
            <p className="text-gray-500">Address</p>
            <p>{task.address || "Schönhauser Allee 94, 79874 Breitnau"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
