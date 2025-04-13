import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormTag } from "app/app/components/tag/create/SectionFormTag";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/tags`
export const steps = ["Informacion general", "Etiquetas", "Persepctivas"]

export default async function Home({params}) {
  const id = (await params).id;
  const initialData = await fetchDataFromServer(id);
  return (
    <>
      <StepForm initialStep={1} stepList={steps} title={"Formulario de etiquetas"}>
        <SectionFormTag isCreate={false} initialData={initialData.data} tagId={id}>
        </SectionFormTag>
      </StepForm>
    </>
  );
}

export async function fetchDataFromServer(id) {
  const response = await fetch(`${url}/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos');
  }
  return response.json();
}
