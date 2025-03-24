"use client";
import { useTargetForm } from "../../context/FormTarget";
import { useStep } from "../../context/StepContext";
import { Button, Input, Select } from "../../utils/Input";


export function SectionFormOptimal() {
  const { formData, handleChange } = useTargetForm();
  const {prevStep } = useStep()
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
