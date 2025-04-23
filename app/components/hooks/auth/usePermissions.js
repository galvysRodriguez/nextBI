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

    const isValid = useCallback((resourcePath) => {
        return user.permissions.some((perm) => {
          const matchModule = perm.module === "*" || perm.module === "BI"; 
          const matchControlator = perm.controlator === "NULL" || resourcePath.includes(perm.controlator);
          const matchResource = perm.resource === "*" || matchResourcePath(perm.resource, resourcePath);
          const matchAction = perm.action === "NULL"; 
    
          return matchModule && matchControlator && matchResource && matchAction;
        });
      }, [user.permissions]);

    return {isValid}
   
  }