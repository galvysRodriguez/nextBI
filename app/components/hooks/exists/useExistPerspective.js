import { useMutation } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/perspectives/exist/`

const verifyPerspective = async (formData) => {
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


const verifyPerspectiveUpdate = async (formData, id) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/perspectives/exist/update/${id}`, {
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

export const useExistPerspective = () => {
    return useMutation(verifyPerspective);
  };

  
export const useExistPerspectiveUpdate = () => {
  return useMutation(verifyPerspectiveUpdate);
};
