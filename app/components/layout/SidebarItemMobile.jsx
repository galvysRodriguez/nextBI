"use client"
import { usePathname } from "next/navigation"
import { useIsExpanded } from "../context/IsGrid"
import Link from "next/link"

export function SidebarItemMobile({ icon, text, href, alert }) {
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
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
        `}
      >
        <Link href={href} className="flex items-center w-full">
          {icon}
          <span
            className={"overflow-hidden transition-all w-52 ml-3"}
          >
            {text}
          </span>
        </Link>
      </li>
    )
  }
  