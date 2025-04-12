import { useMutation } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/targets/exist/`

const verifyTarget = async (formData) => {
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


const verifyTargetUpdate = async ({ formData, id }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/targets/exist/update/${id}`, {
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


export const useExistTarget = () => {
    return useMutation(verifyTarget);
  };

  
export const useExistTargetUpdate = () => {
  return useMutation(verifyTargetUpdate);
};
