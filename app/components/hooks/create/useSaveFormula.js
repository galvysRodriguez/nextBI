import { useMutation } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/formula/`

const saveFormDataFormula = async (formDataFormula) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataFormula),
  });

  if (!response.ok) {
    throw new Error("Error al guardar los datos");
  }

  return response.json();
};

export const useSaveFormFormula = () => {
  return useMutation(saveFormDataFormula);
};


const updateFormDataFormula = async (formDataFormula) => {
  const response = await fetch(`${url}${formDataFormula.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataFormula),
  });

  if (!response.ok) {
    throw new Error("Error al guardar los datos");
  }

  return response.json();
};

export const useUpdateFormFormula = () => {
  return useMutation(updateFormDataFormula);
};
