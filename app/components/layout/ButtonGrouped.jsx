import { ChevronRight, ChevronDown } from "lucide-react"
import { useGroupedName, useIsExpanded } from "../context/IsGrid"
import { usePathname } from "next/navigation"

export function ButtonGrouped({ group, icon, items }) {
  const { openGrouped, setOpenGrouped } = useGroupedName()
  const { expanded } = useIsExpanded()

  const isOpen = !!openGrouped[group]
  const pathname = usePathname()

  const isGroupActive = items?.some(item => pathname.startsWith(item.href))


  return (
    <button
      onClick={() => setOpenGrouped(group)}
      className={`w-full flex items-center py-2 px-3 my-1
        rounded-md cursor-pointer
        transition-colors duration-300
        text-gray-600
        ${
            isGroupActive
              ? "bg-[#C5D2E0]  shadow-sm"
              : "hover:bg-indigo-50  bg-white"
          }`}
    >
      <div className="flex items-center  min-w-0">
        {icon && (
          <span className={`w-5 h-5 flex items-center justify-center text-gray-600`}>
            {icon}
          </span>
        )}
        {expanded && <span
          className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
            expanded ? "w-52 ml-1" : "w-0 ml-0"
          }`}
        >
          {group}
        </span>}
      </div>

      {expanded && <div className="flex-shrink-0">
        {isOpen ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </div>}
      
    </button>
  )
}
