import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormFormula } from "app/app/components/formula/create/SectionFormFormula";
import { SectionFormPerspective } from "app/app/components/perspective/create/SectionFormPerspective";

export const steps = ["Informacion general", "Etiquetas"]

export default function Home() {
  return (
    <>
      <StepForm initialStep={0} stepList={steps} title={"Formulario de perspectivas"}>
        <SectionFormPerspective></SectionFormPerspective>
      </StepForm>
    </>
  );
}
