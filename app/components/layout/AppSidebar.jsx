"use client"
import { Menu, X } from "lucide-react" 
import { NAV_MENU, NAV_MENU_FINAL } from "./NavMenu"
import { Logo } from "./Logo"
import { useMenuMobile } from "../context/IsGrid"
import { SidebarOptionsMobile, SidebarOptionsPC } from "./SidebarOptions"
import { usePerspectiveIconOption } from "./useDynamicPerspective"
import { mapBackendPerspectivesToNav } from "./mapBackendPerspectivesToNav"
import { Avatar } from "./Avatar"
import { usePermissions } from "../hooks/auth/usePermissions"

export default function AppSidebar() {
  const { menuMobile, changeMenuMobile } = useMenuMobile()
  const { data, isLoading, error } = usePerspectiveIconOption()
  const { isValid } = usePermissions();
  
  // Fusionar los datos de la API con NAV_MENU
  const mergedNavMenu = [
    ...NAV_MENU,
    ...mapBackendPerspectivesToNav(data?.data || []),
    ...NAV_MENU_FINAL
  ]

  const filteredMenu = mergedNavMenu.filter((item) => isValid(item.resource));

  //if (isLoading) return <div className="p-4">Cargando...</div>
  //if (error) return <div className="p-4 text-red-500">Error: {error.message}</div>

  return (
    <>
      <div className="md:hidden w-full bg-white shadow-md p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
        <button
          onClick={() => changeMenuMobile()}
          className="p-2 bg-gray-200 rounded"
        >
          {menuMobile ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex place-items-center gap-2">
          <Logo></Logo>
          <strong className="text-xl font-semibold text-[#253664]">AFTIM</strong>
        </div>
        <Avatar></Avatar>
      </div>

      {menuMobile && <SidebarOptionsMobile array={filteredMenu}/>}

      <SidebarOptionsPC array={filteredMenu}/>
      {menuMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => changeMenuMobile()} 
        />
      )}
    </>
  )
}