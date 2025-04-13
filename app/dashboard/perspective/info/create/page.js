import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormPerspective } from "app/app/components/perspective/create/SectionFormPerspective";

export const steps = ["Informacion general", "Etiquetas"]

export default function Home() {
  return (
    <>
      <StepForm initialStep={0} stepList={steps} title={"Formulario de perspectivas"}>
        <SectionFormPerspective isCreate={true}></SectionFormPerspective>
      </StepForm>
    </>
  );
}
