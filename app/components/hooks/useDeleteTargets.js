import { useMutation } from "@tanstack/react-query";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/targets`;

const deleteTarget = async (target_id) => {
  console.log(target_id)
  const response = await fetch(`${url}/${target_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el target");
  }

  return response.json();
};

export const useDeleteTarget = () => {
  return useMutation(deleteTarget);
};