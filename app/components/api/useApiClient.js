import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { API_ROUTES } from "./routes";
import { RESOURCE_MAP } from "./resourceMap";


export const useApiClient = () => {
    const pathname = usePathname();
  
    const detectResourceType = useCallback(() => {
      const segments = pathname.split('/').filter(Boolean);
      
      const resourceEntry = Object.entries(RESOURCE_MAP).find(([key]) => 
        segments.some(segment => segment === key || segment === RESOURCE_MAP[key].plural)
      );
      
      if (!resourceEntry) {
        throw new Error(`Tipo de recurso no detectado en ruta: ${pathname}`);
      }
      
      const [singular, { plural, type }] = resourceEntry;
      
      return {
        resourceType: type, 
        pathSegment: plural, 
        isSingular: segments.includes(singular),
        apiRoutes: API_ROUTES[type]
      };
    }, [pathname]);

    return {detectResourceType}
}