import { useRouter } from "next/navigation"
import { usePermissions } from "./auth/usePermissions"
import { matchRoutePattern } from "../api/mathRoutePattern"
import { routePermissionsMap } from "../api/routePermissions"
import { showErrorToast } from "../utils/toast"

export function usePermissionButton(){
    const router = useRouter()
    const {isValid} = usePermissions()

    const hasPermissions = (fullPath) =>{
        const permission = matchRoutePattern(fullPath, routePermissionsMap)
        console.log("p", permission)
        return permission && isValid(permission.resource, permission.method)
    }

    const handleClick = (fullPath) =>{
        if(hasPermissions(fullPath))
            return router.push(fullPath)
        showErrorToast("No tienes el permiso para esta acción")
    }

    return {hasPermissions, handleClick}
}