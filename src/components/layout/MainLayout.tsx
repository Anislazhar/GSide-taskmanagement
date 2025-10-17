import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 min-h-screen ml-12 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto ml-8 p-4">
          <div className="max-w-[1200px] m-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
