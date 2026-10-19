import { useSaveForm } from "app/app/components/hooks/useSaveForm";
import { SectionFormTarget } from "app/app/components/target/create/SectionFormTarget"
import StepForm from "app/app/components/container/create/StepForm";

export const steps = ["Información general", "Período de tiempo", "Resultados"]

export default async function Home({params}) {
  const perspectiveId = (await params).id;
  return (
    <>
        <StepForm initialStep={0} stepList={steps}>
          <SectionFormTarget isCreate={true} perspectiveId={perspectiveId}></SectionFormTarget>
        </StepForm>
    </>
  );
}
