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
      <div className="flex w-[90vw] mx-auto mt-4">
        <CustomBackButton></CustomBackButton>
        <div className="flex items-center justify-center w-full">
          <h1 className="text-4xl font-bold text-center text-[#1e377c] pt-4 mt-8 mb-6">
          Formulario de objetivos
        </h1>
        </div>
      </div>
      
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl h-[460px] overflow-y-auto">
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
      <label className="block mb-2">Título</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título del objetivo"
        className="w-full p-2 border rounded-lg mb-4"
        required
      />

      <label className="block mb-2">Formulas</label>
      <select
        name="formula_id"
        value={formData.formula_id}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg mb-4"
        required
      >
        <OptionFormula initialData={formData}></OptionFormula>
      </select>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="bg-[#085494] text-white px-4 py-2 rounded-lg"
        >
          Siguiente
        </button>
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
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          {["Óptimo", "Tolerable", "Deficiente"].map((type, index) => (
            <tr key={index} className="text-center">
              <td className="text-gray-600 border p-2 font-semibold">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  name={type}
                  value={formData[type]}
                  onChange={handleChange}
                  className="w-full p-1 border rounded"
                  required
                />
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4 pb-2 pt-12">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-400 text-white px-4 py-2 rounded-lg"
        >
          Anterior
        </button>
        <button
          type="submit"
          className="bg-[#085494] text-white px-4 py-2 rounded-lg"
        >
          Enviar
        </button>
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