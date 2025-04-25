
import { SectionFormTarget } from "app/app/components/target/create/SectionFormTarget"
import StepForm from "app/app/components/container/create/StepForm";
import { API_ROUTES } from "app/app/components/api/routes";
import { apiRequest } from "app/app/components/api/apiRequest";

export const steps = ["Información general", "Periodo de tiempo", "Resultados"]

export default async function Home({ params }) {
  const id = (await params).idTarget;
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
    return await apiRequest({
      endpoint: API_ROUTES.TARGETS.get(id), 
      method: "GET",
    });
}
