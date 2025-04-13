import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormPerspective } from "app/app/components/perspective/create/SectionFormPerspective";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/perspectives`

export const steps = ["Informacion general", "Etiquetas"]

export default async function Home({params}) {
    const id = (await params).id;
    const initialData = await fetchDataFromServer(id);
    return (
        <>
        <StepForm initialStep={1} stepList={steps} title={"Formulario de perspectivas"}>
            <SectionFormPerspective isCreate={false} initialData={initialData.data} perspectiveId={id}>
            </SectionFormPerspective>
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