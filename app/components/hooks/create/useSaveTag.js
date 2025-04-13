import { useMutation } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/tags/`

const saveFormDataTag = async (formDataTag) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataTag),
  });

  if (!response.ok) {
    throw new Error("Error al guardar los datos");
  }

  return response.json();
};

export const useSaveFormTag = () => {
  return useMutation(saveFormDataTag);
};


const updateFormDataTag = async (formDataTag) => {
  const response = await fetch(`${url}${formDataTag.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formDataTag),
  });

  if (!response.ok) {
    throw new Error("Error al guardar los datos");
  }

  return response.json();
};

export const useUpdateFormTag = () => {
  return useMutation(updateFormDataTag);
};
