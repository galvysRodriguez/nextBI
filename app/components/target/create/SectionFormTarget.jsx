"use client";
import { useEffect, useState } from "react";
import { useSaveForm, useUpdateForm } from "../../hooks/useSaveForm";
import { OptionAggregation } from "./OptionAggregation";
import { OptionIndicator } from "./OptionIndicator";
import { OptionFormula } from "./OptionFormula";
import { useTargetForm } from "../../context/FormTarget";
import { useRouter } from "next/navigation";
import { getConvertDate } from "../../utils/convert";
import CustomBackButton from "../detail/BackButton";
import { SectionFormDateTarget } from "./SectionFormDate";
import { Button, Input, Select } from "../../utils/Input";


export default function StepForm({ isCreate, initialStep, initialData }) {
  const{mutate:create} = useSaveForm()
  const{mutate:update} = useUpdateForm()
  const { activeStep, formData, setStep, clearSelection, setFullFormData, adjustStartDate, adjustEndDate } = useTargetForm();
  const router = useRouter()

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep]);

  useEffect(()=>{
      if(!isCreate){
        setFullFormData(initialData)
        adjustStartDate()
        adjustEndDate()
        console.log(initialData)
      }
    }
  ,[])

  const handleSubmit = (e) => {
    e.preventDefault()
    if(isCreate){
      create(formData, {
        onSuccess: () => {
          clearSelection();
          router.push('/dashboard/finance');
        },
        onError: (error) => {
          console.error('Error al guardar el formulario:', error);
        },
      });
      console.log('Datos del formulario enviados:', formData);
    }
    else{
      update(formData, {
        onSuccess: () => {
          clearSelection();
          router.push('/dashboard/finance');
        },
        onError: (error) => {
          console.error('Error al guardar el formulario:', error);
        },
      });
      console.log('Datos del formulario enviados:', formData);
    }
  };
  

  return (
    <>
      <div className="flex w-[80vw] mx-auto mt-4">
        
        <div className="flex items-center justify-between w-[100%] md:w-[66%]">
          <CustomBackButton></CustomBackButton>
          
          <h1 className="text-3xl font-bold text-center text-[#1e377c] pt-4 mt-4 mb-6">
          Formulario de objetivos
        </h1>
        </div>
      </div>
      
      <div className="max-w-lg mx-auto mt-2 p-6 bg-white shadow-lg rounded-2xl h-[520px] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 relative">
          {[1, 2, 3].map((s, index) => (
            <div key={index} className="relative flex items-center">
              {index > 0 && (
                <div className="absolute w-full h-1 bg-gray-300 top-1/2 -translate-y-1/2 left-0 right-0 z-0"></div>
              )}
              <div
                className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                  activeStep === index ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {s}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {activeStep === 0 && <SectionFormInfoTarget></SectionFormInfoTarget>}
          {activeStep === 1 && (
            <SectionFormDateTarget isCreate={isCreate}></SectionFormDateTarget>
          )}
          {activeStep === 2 && (
            <SectionFormOptimalTarget></SectionFormOptimalTarget>
          )}
        </form>
      </div>
    </>
  );
}

export function SectionFormInfoTarget() {
  const { nextStep, setFormData, formData, handleChange } = useTargetForm();
  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Definir Objetivo
      </h2>
      <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between">
          <div className="flex flex-col justify-center">
            <Input
              label="Título"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título del objetivo"
              required
            />
            <Select
              label="Formula"
              name="formula_id"
              value={formData.formula_id}
              onChange={handleChange}
              required
            >
              <OptionFormula initialData={formData}></OptionFormula>
            </Select>
          </div>
          <div className="mt-8">
            <Button
              type="button"
              onClick={nextStep}
              variant="primary"
            >
              Siguiente
            </Button>
          </div>
        </div>
      
     
    </div>
  );
}


export function SectionFormOptimalTarget() {
  const { prevStep, setFormData, formData, handleChange } = useTargetForm();
  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Asignación de Valores
      </h2>
      <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between" >
        <div className="flex flex-col justify-center">
        <Input
        label="Optimo"
        type="number"
        name="optimal"
        value={formData.optimal}
        onChange={handleChange}
        placeholder="200"
        required
      />
      <Input
              label="Tolerable"
              type="number"
              name="tolerable"
              value={formData.tolerable}
              onChange={handleChange}
              placeholder="100"
              required
            />

      <Input
              label="Deficiente"
              type="number"
              name="deficient"
              value={formData.deficient}
              onChange={handleChange}
              placeholder="50"
              required
            />
        </div>
        <div className="mt-8 flex flex-col">
             <Button
              type="submit"
              variant="primary"
            >
              Siguiente
            </Button>
            <Button
              type="button"
              onClick={prevStep}
              variant="secondary"
            >
              Volver
            </Button>
             </div>
      </div>
        
    </div>
  );
}

/*<td className="border p-2">
                <input
                  type="number"
                  name={`${type}_percentage`}
                  value={formData[`${type}_percentage`]}
                  onChange={handleChange}
                  className="w-full p-1 border rounded"
                  required
                />
              </td>*/ 