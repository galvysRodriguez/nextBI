"use client"
import { usePathname } from "next/navigation"
import { useIsExpanded } from "../context/IsGrid"
import Link from "next/link"

export function SidebarItem({ icon, text, href, alert }) {
    const { expanded } = useIsExpanded()
    const pathname = usePathname()
  
    const isActive = pathname === href
  
    return (
      <li
        className={`
          relative flex items-center py-2 px-3 my-1
          font-medium rounded-md cursor-pointer
          transition-colors group
          ${
            isActive
              ? " bg-indigo-100 text-[#085494]"
              : "hover:bg-indigo-50 text-gray-600"
          }
        `}
      >
        <Link href={href} className="flex items-center w-full">
          {icon && (
              <span className="w-4 h-4 flex items-center justify-center text-gray-600">
                  {icon}
              </span>
              )}
          <span
            className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
        </Link>
        
  
        {!expanded && (
          <div
            className={`
              absolute left-full rounded-md px-2 py-1 ml-6
              bg-indigo-100 text-indigo-800 text-sm
              invisible opacity-20 -translate-x-3 transition-all
              group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
          >
            {text}
          </div>
        )}
      </li>
    )
  }
  