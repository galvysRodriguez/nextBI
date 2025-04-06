"use client";
import { useTargetForm } from "../../context/FormTarget";
import { Button, Input, Select } from "app/app/components/utils/Input";
import { useStep } from "app/app/components/context/StepContext";
import SelectMultiple from "../../utils/SelectMultiple";

export const mocksOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

export function SectionFormPerspective() {
  const { setFormData, formData, handleChange, setPerspectives } = useTargetForm();

  const {prevStep} = useStep()
  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Agregar a perspectiva
      </h2>
      <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between">
          <div className="flex flex-col justify-center">
            <SelectMultiple
              label="Perspectivas"
              name="perspectives"
              value={formData.perspectives}
              onChange={setPerspectives}
              required
              options={mocksOptions}
            >
            </SelectMultiple>
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
