import SidebarMobile from "./SidebarMobile"
import { SidebarItemMobile } from "./SidebarItemMobile"
import Sidebar from "./Sidebar"
import { SidebarItem } from "./SidebarItem"
import { useGroupedName, useIsExpanded } from "../context/IsGrid"
import { ChevronDown } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { ButtonGrouped } from "./ButtonGrouped"


export function SidebarOptionsMobile ({array}){
    const { openGrouped } = useGroupedName()
    return (
        <div className="fixed h-full bg-white shadow-lg z-50 transform transition-transform duration-300">
            <SidebarMobile>
            {array.map((group) => (
                <div key={group.group.text}>
                    <ButtonGrouped group={group.group.text} icon={group.group.icon} items={group.items}></ButtonGrouped>
                    <ul
                    className={`
                        pl-2 overflow-hidden transition-[max-height,padding] duration-300 ease-in-out
                        ${openGrouped[group.group.text] ? "max-h-[500px] py-1" : "max-h-0 py-0"}
                    `}
                    >
                    {group.items.map((nav) => (
                        <SidebarItemMobile {...nav} key={nav.text} />
                    ))}
                    </ul>
                </div>
                ))}
            </SidebarMobile>
        </div>
    )
}


export function SidebarOptionsPC({array}){
    const { openGrouped } = useGroupedName()
    const { expanded } = useIsExpanded()
    return (
        <div className="hidden md:block max-h-[60vw] overflow-y-visible">
            <Sidebar>
                {array.map((group) => (
                <div key={group.group.text}>
                    <ButtonGrouped group={group.group.text} icon={group.group.icon} items={group.items}></ButtonGrouped>
                    <ul
                    className={`
                        ${expanded ? "pl-2" : ""}
                        overflow-hidden transition-[max-height,padding] duration-300 ease-in-out
                        ${openGrouped[group.group.text] ? "max-h-[500px] py-1" : "max-h-0 py-0"}
                    `}
                    >
                    {group.items.map((nav) => (
                        <SidebarItem {...nav} key={nav.text} />
                    ))}
                    </ul>
                </div>
                ))}
            </Sidebar>
        </div>
    )
}