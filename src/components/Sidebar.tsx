import React from "react";
import {
  PanelLeftOpen,
  PanelRightOpen,
  ClipboardCheck,
  BriefcaseBusiness,
  Contact,
  SquarePlus,
  Power,
  Info,
} from "lucide-react";
import BackgroundImage from "../assets/backgroundImage.png";

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div
      className={`fixed h-screen text-white flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-14" : "w-60"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: BackgroundImage ? `url(${BackgroundImage})` : "none",
        }}
      ></div>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold" aria-label="Sidebar Title">
              ZS
            </h2>
          )}

          <button
            onClick={toggleSidebar}
            className="flex flex-col items-center gap-2"
          >
            {isCollapsed ? <PanelLeftOpen /> : <PanelRightOpen />}
            <h1 className="font-bold py-2">ZS</h1>
          </button>
        </div>

        <div className="relative z-10 flex flex-col justify-between h-full">
          <nav className="flex flex-col p-4 space-y-4">
            <button
              type="button"
              className="flex items-center gap-3 hover:text-blue-300 transition-colors bg-transparent border-none p-0 text-inherit cursor-pointer"
            >
              <ClipboardCheck size={20} />
            </button>

            <button
              type="button"
              className="flex items-center gap-3 hover:text-blue-300 transition-colors bg-transparent border-none p-0 text-inherit cursor-pointer"
            >
              <BriefcaseBusiness size={20} />
            </button>

            <button
              type="button"
              className="flex items-center gap-3 hover:text-blue-300 transition-colors bg-transparent border-none p-0 text-inherit cursor-pointer"
            >
              <Contact size={20} />
            </button>

            <button
              type="button"
              className="flex items-center gap-3 hover:text-blue-300 transition-colors bg-transparent border-none p-0 text-inherit cursor-pointer"
            >
              <SquarePlus size={20} />
            </button>
          </nav>

          <nav className="flex flex-col  space-y-4">
            <div className="flex p-1 font-thin border-b border-gray-700">
              <span>About</span>
            </div>

            <h1 className="p-4 font-bold">SU</h1>

            <button
              type="button"
              className="flex items-center gap-3 hover:text-blue-300 transition-colors bg-transparent border-b  border-gray-700 p-4 text-inherit cursor-pointer"
            >
              <Power size={20} />
            </button>

            <button
              type="button"
              className="flex items-center gap-3 hover:text-blue-300 transition-colors bg-transparent border-none p-4 text-inherit cursor-pointer"
            >
              <Info size={15} />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
