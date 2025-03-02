import { useMutation } from "@tanstack/react-query";
import { useCardStore } from "../context/IsGrid";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/targets/`

const saveFormData = async (formData) => {
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

export const useSaveForm = () => {
  return useMutation(saveFormData);
};


const updateFormData = async (formData) => {
  const response = await fetch(`${url}${formData.id}`, {
    method: "PUT",
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

export const useUpdateForm = () => {
  return useMutation(updateFormData);
};
