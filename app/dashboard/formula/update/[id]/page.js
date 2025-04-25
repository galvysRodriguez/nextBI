import { apiRequest } from "app/app/components/api/apiRequest";
import { API_ROUTES } from "app/app/components/api/routes";
import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormFormula } from "app/app/components/formula/create/SectionFormFormula";

export const steps = ["Informacion general", "Editor de formula"]

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
    return await apiRequest({
      endpoint: API_ROUTES.FORMULA.get(id), 
      method: "GET",
    });
}
