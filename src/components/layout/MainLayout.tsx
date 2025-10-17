import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="flex">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 md:ml-20 min-h-screen flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100">
          <div className="max-w-[1200px] m-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
