import SidebarMobile from "./SidebarMobile"
import { SidebarItemMobile } from "./SidebarItemMobile"
import Sidebar from "./Sidebar"
import { SidebarItem } from "./SidebarItem"


export function SidebarOptionsMobile ({array}){

    return (
        <div className="fixed h-full bg-white shadow-lg z-50 transform transition-transform duration-300">
            <SidebarMobile>
            {array.map((nav) => (
            <SidebarItemMobile {...nav} key={nav.text} />
            ))}
            </SidebarMobile>
        </div>
    )
}


export function SidebarOptionsPC({array}){
    return (
        <div className="hidden md:block">
        <Sidebar>
            {array.map((nav) => (
              <SidebarItem {...nav} key={nav.text} />
            ))}
          </Sidebar>
      </div>
    )
}