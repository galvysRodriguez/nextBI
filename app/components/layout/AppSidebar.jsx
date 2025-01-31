"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react" 
import { NAV_MENU } from "./NavMenu"
import Sidebar, { IconUser } from "./Sidebar"
import { SidebarItem } from "./SidebarItem"

export default function AppSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Header para móvil */}
      <div className="md:hidden w-full bg-white shadow-md p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 bg-gray-200 rounded"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-lg font-bold">AFTIM</h1>
        <IconUser></IconUser>
      </div>

      {isMenuOpen && (
        <div className="fixed h-full bg-white shadow-lg z-50 transform transition-transform duration-300">
          <Sidebar>
            {NAV_MENU.map((nav) => (
              <SidebarItem {...nav} key={nav.text} />
            ))}
          </Sidebar>
        </div>
      )}

      <div className="hidden md:block">
        <Sidebar>
            {NAV_MENU.map((nav) => (
              <SidebarItem {...nav} key={nav.text} />
            ))}
          </Sidebar>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  )
}