"use client";
import { useEffect, useState } from "react";
import { useSaveForm, useUpdateForm } from "../../hooks/useSaveForm";
import { useTargetForm } from "../../context/FormTarget";
import { useRouter } from "next/navigation";
import { SectionFormDateTarget } from "./SectionFormDate";
import { SectionFormOptimal } from "./SectionFormOptimal";
import { SectionFormInfo } from "./SectionFormInfo";
import { useStep } from "../../context/StepContext";

export function SectionFormTarget({ isCreate }) {
  const { mutate: create } = useSaveForm();
  const { mutate: update } = useUpdateForm();
  const { 
    formData, 
    clearSelection, 
    setFullFormData, 
    adjustStartDate, 
    adjustEndDate 
  } = useTargetForm();
  const{activeStep}= useStep()
  const router = useRouter();


  useEffect(() => {
    if (!isCreate) {
      setFullFormData(initialData);
      adjustStartDate();
      adjustEndDate();
    }
  }, [isCreate, setFullFormData, adjustStartDate, adjustEndDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mutation = isCreate ? create : update;
    
    mutation(formData, {
      onSuccess: () => {
        clearSelection();
        router.push('/dashboard/finance');
      },
      onError: (error) => {
        console.error(`Error al ${isCreate ? 'crear' : 'actualizar'} el formulario:`, error);
      },
    });
    
  };

  return (
    <form onSubmit={handleSubmit}>
      {activeStep === 0 && <SectionFormInfo />}
      {activeStep === 1 && <SectionFormDateTarget isCreate={isCreate} />}
      {activeStep === 2 && <SectionFormOptimal />}
    </form>
  );
}