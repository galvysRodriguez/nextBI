import { useRouter } from "next/navigation";
import { useAuthStore } from "../hooks/auth/useAuthStore";
import { LogOut } from "lucide-react";

export function ButtonLogout() {
    const { clearAuthData } = useAuthStore()
    const router = useRouter()

    const handleClick = () =>{
        clearAuthData()
        router.push('/login')
    }

    return (
        <button 
            onClick={handleClick}
            className="p-2 rounded-md text-gray-500 hover:bg-[#115293] hover:text-white transition-colors"
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
        >
            <LogOut className="w-5 h-5" />
        </button>
    )
}