import { useAuthStore } from "../hooks/auth/useAuthStore"
import { ButtonLogout } from "./ButtonLogout"


export function DetailUserNav(){
    const {user} = useAuthStore()
    return (
        <div className="flex justify-between items-center gap-2">
            <div className="leading-4">
                <h4 className="font-medium text-blue-800">{user?.role || "Gerente"}</h4>
                <span className="text-xs text-gray-600">{user?.email || "john@gmail.com"}</span>
            </div>
            <ButtonLogout></ButtonLogout>
        </div>
    )
}

