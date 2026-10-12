import { useMutation } from "@tanstack/react-query";
import { useCardStore } from "../context/IsGrid";
import { API_ROUTES } from "../api/routes";

const saveFormData = async (formData) => {
  const response = await fetch(API_ROUTES.TARGETS.create, {
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
  const response = await fetch(API_ROUTES.TARGETS.update(formData.id), {
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
