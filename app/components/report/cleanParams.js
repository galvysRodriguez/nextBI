export function cleanParams(obj) {
  const cleaned = {};
  for (const key in obj) {
    if (obj[key] !== null && 
      obj[key] !== undefined && 
      obj[key] !== "" &&  
      !(typeof value === "number" && isNaN(value))) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}