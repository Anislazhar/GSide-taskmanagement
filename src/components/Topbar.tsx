import { ClipboardCheck } from "lucide-react";
import React from "react";

export default function Topbar() {
  return (
    <header>
      <div className="max-w-[1200px] mx-auto md:ml-32 pt-2 flex  ">
        <div className="flex items-center gap-3 mb-1 pr-4">
          <ClipboardCheck size={20} />
        </div>
        <div>
          <div className="text text-slate-800 font-bold">Alex Azubi</div>

          <div className="flex items-center gap-3">
            <div className="text-sky-600">Taskmanager</div>
          </div>
        </div>
      </div>
    </header>
  );
}
