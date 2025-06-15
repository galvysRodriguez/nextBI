import { useCallback } from "react";

export function useHandleRowsNormalize() {
   const normalizeDecimal = useCallback((rawRows) => {
    return rawRows.map((row) => {
      const formattedRow = { ...row };

      for (const key in formattedRow) {
        const value = formattedRow[key];
        if (typeof value === "number") {
          formattedRow[key] = parseFloat(value.toFixed(2));
        }
      }

      return formattedRow;
    });
  }, []);

  return { normalizeDecimal };
}
