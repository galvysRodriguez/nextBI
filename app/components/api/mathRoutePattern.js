export function matchRoutePattern(inputPath, routesMap) {
    for (const pattern in routesMap) {
      const regexPattern = pattern
        .replace(/:[^/]+/g, "[^/]+")  
        .replace(/\//g, "\\/");      
  
      const regex = new RegExp(`^${regexPattern}$`);
      if (regex.test(inputPath)) {
        return routesMap[pattern]; 
      }
    }
    return undefined;
  }
  