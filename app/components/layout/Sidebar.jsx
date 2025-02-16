"use client"

import { ChevronFirst, Menu } from "lucide-react"
import { Logo } from "./Logo"
import { useIsExpanded } from "../context/IsGrid";

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

        <div className="hidden md:flex border-t p-3 items-center">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


export function NavUser() {
  const { expanded, changeExpanded } = useIsExpanded();
  return (
    <div
      className={`overflow-hidden transition-all${
        expanded ? "w-52 ml-3" : "w-0"
      }`}
    >
      <div className="leading-4">
        <h4 className="font-semibold">John Doe</h4>
        <span className="text-xs text-gray-600">johndoe@gmail.com</span>
      </div>
    </div>
  );
}

export function IconUsers() {
  return (
    <div className="hidden md:flex border-t p-3 items-center">
      <img
        src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
        alt=""
        className="w-10 h-10 rounded-md"
      />
    </div>
  );
}

export function IconUser(){
  return (
    <img
      src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
      alt=""
      className="w-10 h-10 rounded-md"
    />
  )
}
