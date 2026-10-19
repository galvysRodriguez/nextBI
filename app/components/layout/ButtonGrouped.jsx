import { ChevronRight, ChevronDown } from "lucide-react";
import { useGroupedName, useIsExpanded } from "../context/IsGrid";
import { usePathname } from "next/navigation";

export function ButtonGrouped({ group, icon, items }) {
  const { openGrouped, setOpenGrouped } = useGroupedName();
  const { expanded } = useIsExpanded();

  const isOpen = !!openGrouped[group];
  const pathname = usePathname();

  const isGroupActive = items?.some((item) => pathname.startsWith(item.href));

  return (
    <button
      onClick={() => setOpenGrouped(group)}
      className={`w-full flex items-center gap-2 ${expanded ? "px-3" : ""} py-2 my-1
        rounded-md cursor-pointer
        transition-colors duration-300
        text-gray-600
        ${
          isGroupActive
            ? "bg-[#C5D2E0]  shadow-sm"
            : "hover:bg-indigo-50  bg-white"
        }`}
    >
      <div className={`flex items-center ${expanded ? "justify-between": "justify-center"} w-full`}>
        <div className={`flex items-center ${expanded ? "gap-4": "justify-center"}`}>
          <div className={`flex items-center justify-center min-w-0`}>
            {icon && (
              <span
                className={`w-5 h-5 flex items-center justify-center text-gray-600`}
              >
                {icon}
              </span>
            )}
          </div>
          {expanded &&(
             <div>
            <span
              className={`transition-all duration-300 whitespace-nowrap "w-52"
              } overflow-hidden`}
            >
              {group}
            </span>
          </div>
          )}
         
        </div>

        {expanded && (
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
        )}
      </div>
    </button>
  );
}
