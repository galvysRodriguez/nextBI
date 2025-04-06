"use client";
import { useEffect } from "react";
import { useStep } from "../../context/StepContext";
import { useDataForm } from "../../context/useDataForm";
import { useSaveFormula } from "../../hooks/useFormula";
import { SectionFormInfo } from "./SectionFormInfo";
import { SectionFormIndicator } from "./SectionFormIndicator";
import { useTargetForm } from "../../context/FormTarget";
import { SectionFormPerspective } from "./SectionFormPerspective";

export function SectionFormTag({ isCreate }) {
   const { formData,validate } =useTargetForm();
   const{activeStep}= useStep()
   const { mutate} = useSaveFormula();
   const saveFormula = (e) => {
        e.preventDefault();
       
            console.log(
              `Fórmula creada con éxito: formData`, {formData}
            );
            //mutate(formData);
          
        };

   useEffect(()=>{
    console.log("tags:", formData.tags)
   },[formData.tags])


  return (
    <form onSubmit={saveFormula}>
      {activeStep === 0 && <SectionFormInfo />}
      {activeStep === 1 && <SectionFormIndicator isCreate={isCreate} />}
      {activeStep === 2 && <SectionFormPerspective />}
    </form>
  );
}