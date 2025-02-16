"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react" 
import { NAV_MENU } from "./NavMenu"
import Sidebar, { IconUser } from "./Sidebar"
import { SidebarItem } from "./SidebarItem"
import { Logo } from "./Logo"
import { useMenuMobile } from "../context/IsGrid"
import SidebarMobile from "./SidebarMobile"
import { SidebarItemMobile } from "./SidebarItemMobile"

export default function AppSidebar() {
  const{menuMobile, changeMenuMobile} = useMenuMobile()

  return (
    <>
      {/* Header para móvil */}
      <div className="md:hidden w-full bg-white shadow-md p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        
        <button
          onClick={() => changeMenuMobile()}
          className="p-2 bg-gray-200 rounded"
        >
          {menuMobile ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex place-items-center gap-2">
          <Logo></Logo>
          <strong className="text-xl font-semibold text-[#253664]" >AFTIM</strong>
        </div>
        
        <IconUser></IconUser>
      </div>

      {menuMobile && (
        <div className="fixed h-full bg-white shadow-lg z-50 transform transition-transform duration-300">
          <SidebarMobile>
            {NAV_MENU.map((nav) => (
              <SidebarItemMobile {...nav} key={nav.text} />
            ))}
          </SidebarMobile>
        </div>
      )}

      <div className="hidden md:block">
        <Sidebar>
            {NAV_MENU.map((nav) => (
              <SidebarItem {...nav} key={nav.text} />
            ))}
          </Sidebar>
      </div>
      {menuMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => changeMenuMobile()} />
      )}
    </>
  )
}