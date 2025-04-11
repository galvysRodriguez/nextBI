"use client";
import { OptionFormula } from "./OptionFormula";
import { Button, Input, Select } from "../../utils/Input";
import { SelectSimple } from "../../utils/SelectMultiple";
import { useFormTargetOne } from "../../hooks/validations/useFormTargetOne";
import { IconError } from "../../utils/IconError";

export const mocksOptions = [
  { value: 1, label: 'Chocolate' },
  { value: 2, label: 'Strawberry' },
  { value: 3, label: 'Vanilla' }
]

export function SectionFormInfo() {
   const { values,
          errors,
          touched,
          setFieldValue,
          handleNext,
          handleChange,
          handleBlur,
          validateField,
          setFieldTouched,
        } = useFormTargetOne()
  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Definir Objetivo
      </h2>
      <div className="w-[80%] h-[420px] m-auto pt-2 flex flex-col justify-between">
          <div className="flex flex-col justify-center gap-4">
            <div>
              <Input
                label="Título"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Título del objetivo"
                required
                error={touched.title && errors.title}
              />
              {touched.title && errors.title && (
                <div className="text-red-500 text-sm flex items-start">
                  <IconError></IconError>
                  {errors.title}
                </div>
              )}
            </div>
            <div>
              <SelectSimple
                label="Etiqueta"
                name="tag"
                value={mocksOptions.find(opt => opt.value === values.tag)}
                onChange={(selected) => {
                  setFieldValue('tag', selected?.value ?? '');
                  setFieldTouched('tag', true, false);
                }}
                options={mocksOptions}
                error={touched.tag && errors.tag}
              >
                </SelectSimple>
                {touched.tag && errors.tag && (
                  <div className="text-red-500 text-sm flex items-start">
                    <IconError></IconError>
                    {errors.tag}
                  </div>
                )}
            </div>
            <div>
            <SelectSimple
              label="Formula"
              name="formula_id"
              value={mocksOptions.find(opt => opt.value === values.formula_id)}
              onChange={ (selected) => {
                setFieldValue('formula_id', selected?.value ?? '');
                setFieldTouched('formula_id', true, false);
              }}
              options={mocksOptions}
              error={touched.formula_id && errors.formula_id}
            >
            </SelectSimple>
            {touched.formula_id && errors.formula_id && (
                <div className="text-red-500 text-sm flex items-start">
                <IconError></IconError>
                {errors.formula_id}
              </div>
            )}
            </div>
          </div>
          <div className="mt-8">
            <Button
              type="button"
              onClick={handleNext}
              variant="primary"
            >
              Siguiente
            </Button>
          </div>
        </div>
    </div>
  );
}
