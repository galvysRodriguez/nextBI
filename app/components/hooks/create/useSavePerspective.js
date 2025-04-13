import { useMutation } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/perspectives/`

const saveFormDataPerspective = async (formDataPerspective) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataPerspective),
  });

  if (!response.ok) {
    throw new Error("Error al guardar los datos");
  }

  return response.json();
};

export const useSaveFormPerspective = () => {
  return useMutation(saveFormDataPerspective);
};


const updateFormDataPerspective = async (formDataPerspective) => {
  const response = await fetch(`${url}${formDataPerspective.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataPerspective),
  });

  if (!response.ok) {
    throw new Error("Error al guardar los datos");
  }

  return response.json();
};

export const useUpdateFormPerspective = () => {
  return useMutation(updateFormDataPerspective);
};
