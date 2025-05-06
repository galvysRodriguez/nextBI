"use client"
import { useIsExpanded } from "../context/IsGrid";
import { Avatar } from "./Avatar";
import { DetailUserNav } from "./DetailUserNav";


export function InfoUserNav(){
     const { expanded} = useIsExpanded();
    return (
        <div className="hidden md:flex min-h-10 border-t p-3 items-center">
            <Avatar></Avatar>
            <div
                className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
                }`}
            >
                <DetailUserNav></DetailUserNav>
            </div>
        </div>
    )
}