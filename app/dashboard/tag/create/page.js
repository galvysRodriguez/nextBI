import StepForm from "app/app/components/container/create/StepForm";
import { SectionFormFormula } from "app/app/components/formula/create/SectionFormFormula";
import { SectionFormPerspective } from "app/app/components/perspective/create/SectionFormPerspective";
import { SectionFormTag } from "app/app/components/tag/create/SectionFormTag";
import { ToastContainer } from "react-toastify";


export const steps = ["Informacion general", "Etiquetas", "Persepctivas"]

export default function Home() {
  return (
    <>
      <StepForm initialStep={0} stepList={steps} title={"Formulario de etiquetas"}>
        <SectionFormTag></SectionFormTag>
      </StepForm>
    
    </>
  );
}
