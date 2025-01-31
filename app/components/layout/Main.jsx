"use client"

import { useIsExpanded } from "../context/IsGrid"

export default function MainContainer({ children }) {
  const { expanded } = useIsExpanded()

  return (
    <main
      className={`min-h-screen bg-gray-100 text-[#000] px-8 transition-all duration-300 flex-1 ${
        expanded ? "md:ml-64 md:w-[calc(100%-16rem)]" : "md:ml-16 md:w-[calc(100%-4rem)]"
      }`}
    >
      {children}
    </main>
  )
}
