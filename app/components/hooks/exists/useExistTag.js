import { useMutation } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/tags/exist/`

const verifyTag = async (formData) => {
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


const verifyTagUpdate = async (formData, id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/tags/exist/update/${id}`, {
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

export const useExistTag = () => {
    return useMutation(verifyTag);
  };

  
export const useExistTagUpdate = () => {
  return useMutation(verifyTagUpdate);
};
