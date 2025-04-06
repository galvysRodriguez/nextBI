"use client";
import { useTargetForm } from "../../context/FormTarget";
import { Button, Input, Select } from "app/app/components/utils/Input";
import { useStep } from "app/app/components/context/StepContext";
import { SelectSimple } from "../../utils/SelectMultiple";
import { mocksOptions } from "./SectionFormTag";


export function SectionFormInfo() {
  const { setFormData, formData, handleChange, setIcons } = useTargetForm();
  const {nextStep} = useStep()
  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Información General
      </h2>
      <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between">
          <div className="flex flex-col justify-center">
            <Input
              label="Título"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Título"
              required
            />
            <SelectSimple
              label="Icono"
              name="icon_id"
              value={formData.icons}
              onChange={setIcons}
              options={mocksOptions}
              required
            >
            </SelectSimple>
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
