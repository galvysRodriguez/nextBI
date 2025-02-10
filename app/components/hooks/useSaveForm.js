import { useMutation } from "@tanstack/react-query";

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
