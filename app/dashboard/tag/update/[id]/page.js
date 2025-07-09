import { apiRequest } from "app/app/components/api/apiRequest";
import { API_ROUTES } from "app/app/components/api/routes";
import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormTag } from "app/app/components/tag/create/SectionFormTag";

export const steps = ["Información general", "Variables", "Perspectivas"]

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
    return await apiRequest({
      endpoint: API_ROUTES.TAGS.get(id), 
      method: "GET",
    });
}
