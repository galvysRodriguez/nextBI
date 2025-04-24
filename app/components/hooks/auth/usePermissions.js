"use client"
import { useCallback } from "react";
import { useAuthStore } from "./useAuthStore";


function matchResourcePath(permResource, inputResource) {
    const pattern = permResource
      .replace(/:[^/]+/g, "[^/]+") 
      .replace(/\*/g, ".*");       
  
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(inputResource);
  }
  

export function usePermissions() {
    const {user} = useAuthStore()

    const isValid = useCallback((resourcePath, action = "get") => {
        if (!user || !user.permissions) return false
        return user.permissions.some((perm) => {
          if (perm.module === "*") return true
           
          const matchControlator = resourcePath.includes(perm.controlator);
          if(matchControlator && perm.action === "*") return true

          const matchModule = perm.module === "BI";
          const matchResource = matchResourcePath(perm.resource, resourcePath);
          const matchAction =  perm.action === action
    
          return matchModule && matchControlator && matchResource && matchAction;
        });
      }, [user]);

    return {isValid}
   
  }