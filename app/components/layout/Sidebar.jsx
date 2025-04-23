"use client"
import { ChevronFirst, Menu } from "lucide-react"
import { Logo } from "./Logo"
import { useIsExpanded } from "../context/IsGrid";
import { InfoUserNav } from "./InfoUserNav";
import { DetailUserNav } from "./DetailUserNav";

export default function Sidebar({ children }) {
  const { expanded, changeExpanded } = useIsExpanded();

  return (
    <header className="md:h-screen">
      <nav
        className={`fixed top-0 left-0 h-full md:h-screen flex flex-col bg-white border-r shadow-sm transition-all duration-300 ${
          expanded ? "md:w-64" : "md:w-16"
        }`}
      >
        <div className="p-4 pb-2 flex justify-center items-center md:flex-col md:items-start">
          <button
            onClick={() => changeExpanded()}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 md:mt-4"
          >
            {expanded ? <ChevronFirst /> : <Menu />}
          </button>
          <div className="flex place-items-center gap-2">
            <Logo></Logo>
            <strong
              className={`text-xl font-semibold text-[#253664] transition-opacity duration-300 ${
                !expanded ? "hidden opacity-0 invisible" : "opacity-100 visible"
              }`}
            >
              AFTIM
            </strong>
          </div>
        </div>

        <ul className="flex flex-col md:flex-1 px-3 ">{children}</ul>
        <InfoUserNav></InfoUserNav>
      </nav>
    </header>
  );
}
