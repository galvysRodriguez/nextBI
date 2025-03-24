"use client";
import { OptionFormula } from "./OptionFormula";
import { useTargetForm } from "../../context/FormTarget";
import { Button, Input, Select } from "../../utils/Input";
import { useStep } from "../../context/StepContext";


export function SectionFormInfo() {
  const { setFormData, formData, handleChange } = useTargetForm();
  const {nextStep} = useStep()
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
