import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormFormula } from "app/app/components/formula/create/SectionFormFormula";

export const steps = ["Informacion general", "Editor de formula"]
const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/formula`

export default async function Home({params}) {
  const id = (await params).id;
  const initialData = await fetchDataFromServer(id);
  return (
    <>
      <StepForm initialStep={1} stepList={steps} title={"Formulario de fórmulas"}>
        <SectionFormFormula isCreate={false} initialData={initialData.data} formulaId={id}>
        </SectionFormFormula>
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
