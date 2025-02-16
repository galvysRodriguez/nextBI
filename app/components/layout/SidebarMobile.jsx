"use client";

import { ChevronFirst, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { useIsExpanded, useMenuMobile } from "../context/IsGrid";

export default function SidebarMobile({ children }) {
  const { expanded, changeExpanded } = useIsExpanded();
  const { changeMenuMobile } = useMenuMobile();

  return (
    <header className="md:h-screen">
      <nav
        className={`fixed top-0 left-0 h-full md:h-screen flex flex-col bg-white border-r shadow-sm transition-all duration-300 ease-in-out ${
          expanded ? "md:w-64" : "md:w-16"
        }`}
      >
        <div className="p-4 pb-2 flex justify-center items-center md:flex-col md:items-start">
          <button
            onClick={() => changeMenuMobile()}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 md:mt-4 transition-colors duration-200"
          >
            {expanded ? (
              <ChevronFirst className="transition-transform duration-300" />
            ) : (
              <Menu className="transition-transform duration-300" />
            )}
          </button>
        </div>

        <ul className="flex flex-col md:flex-1 px-3 transition-opacity duration-300">
          {children}
        </ul>
      </nav>
    </header>
  );
}