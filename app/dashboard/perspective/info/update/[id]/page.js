import { apiRequest } from "app/app/components/api/apiRequest";
import { API_ROUTES } from "app/app/components/api/routes";
import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormPerspective } from "app/app/components/perspective/create/SectionFormPerspective";

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
    return await apiRequest({
      endpoint: API_ROUTES.PERSPECTIVES.get(id), 
      method: "GET",
    });
}
