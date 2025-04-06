"use client";
import { useEffect } from "react";
import { useStep } from "../../context/StepContext";
import { useDataForm } from "../../context/useDataForm";
import { useSaveFormula } from "../../hooks/useFormula";
import { SectionFormInfo } from "./SectionFormInfo";
import { SectionFormTag } from "./SectionFormTag";
import { useTargetForm } from "../../context/FormTarget";

export function SectionFormPerspective({ isCreate }) {
   const { formData,validate } =useTargetForm();
   const{activeStep}= useStep()
   const { mutate} = useSaveFormula();
   const saveFormula = (e) => {
        e.preventDefault();
       
            alert(
              `Fórmula creada con éxito: ${formData.tags[0].value}`
            );
            //mutate(formData);
          
        };

   useEffect(()=>{
    console.log("tags:", formData.tags)
   },[formData.tags])


  return (
    <form onSubmit={saveFormula}>
      {activeStep === 0 && <SectionFormInfo />}
      {activeStep === 1 && <SectionFormTag isCreate={isCreate} />}
    </form>
  );
}