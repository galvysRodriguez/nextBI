import { useQuery } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/formula/`

const saveFormulaData = async (formData) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Error al guardar los datos");
  }

  return response.json();
};

export const useSaveFormula = () => {
  return useMutation(saveFormulaData);
};

