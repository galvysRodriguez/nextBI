"use client";
import { useStep } from "../../context/StepContext";
import { useDataForm } from "../../context/useDataForm";
import { useSaveFormula } from "../../hooks/useFormula";
import { SectionFormEditor } from "./SectionFormEditor";
import { SectionFormInfo } from "./SectionFormInfo";

export function SectionFormFormula({ isCreate }) {
   const { formData,validate } =useDataForm();
   const{activeStep}= useStep()
   const { mutate} = useSaveFormula();
   const saveFormula = (e) => {
        e.preventDefault();
        if (validate()) {
            alert(
              `Fórmula creada con éxito: ${formData.formula} y ${formData.title}`
            );
            mutate(formData);
          }
        };


  return (
    <form onSubmit={saveFormula}>
      {activeStep === 0 && <SectionFormInfo />}
      {activeStep === 1 && <SectionFormEditor isCreate={isCreate} />}
    </form>
  );
}