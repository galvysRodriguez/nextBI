import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormTag } from "app/app/components/tag/create/SectionFormTag";

export const steps = ["Información general", "Variables", "Perspectivas"]

export default function Home() {
  return (
    <>
      <StepForm initialStep={0} stepList={steps} title={"Formulario de etiquetas"}>
        <SectionFormTag isCreate={true}></SectionFormTag>
      </StepForm>
    </>
  );
}
