import { useAuthStore } from "../hooks/auth/useAuthStore"


export function DetailUserNav(){
    const {user} = useAuthStore()
    return (
        <div className="leading-4">
            <h4 className="font-medium text-blue-800">{user?.role || "Gerente"}</h4>
            <span className="text-xs text-gray-600">{user?.email || "john@gmail.com"}</span>
        </div>
    )
}

