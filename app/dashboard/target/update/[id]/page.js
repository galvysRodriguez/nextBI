
import { SectionFormTarget } from "app/app/components/target/create/SectionFormTarget"
import StepForm from "app/app/components/container/create/StepForm";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/targets`
export const steps = ["Información general", "Periodo de tiempo", "Resultados"]

export default async function Home({ params }) {
  const id = (await params).id;
  const initialData = await fetchDataFromServer(id);
  
  return (
    <>
        <StepForm initialStep={1} stepList={steps}>
          <SectionFormTarget isCreate={false} initialData={initialData.data} targetId={id}></SectionFormTarget>
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

/*<ManageUpdate id={id} isCreate={true} activeStep={1}></ManageUpdate>*/