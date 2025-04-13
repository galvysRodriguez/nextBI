import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormFormula } from "app/app/components/formula/create/SectionFormFormula";

export const steps = ["Informacion general", "Editor de formula"]

export default function Home() {
  return (
    <>
      <StepForm initialStep={0} stepList={steps} title={"Formulario de fórmulas"}>
        <SectionFormFormula isCreate={true}></SectionFormFormula>
      </StepForm>
    </>
  );
}

