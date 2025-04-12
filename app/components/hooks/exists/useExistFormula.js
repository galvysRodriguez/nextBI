import { useMutation } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/formula/exist/`

const verifyFormula = async (formData) => {
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


const verifyFormulaUpdate = async (formData, id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/formula/exist/update/${id}`, {
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

export const useExistFormula = () => {
    return useMutation(verifyFormula);
  };

  
export const useExistFormulaUpdate = () => {
  return useMutation(verifyFormulaUpdate);
};
