"use client";
import { useStep } from "../../context/StepContext";
import { useFormTargetThree } from "../../hooks/validations/useFormTargetThree";
import { IconError } from "../../utils/IconError";
import { Button, Input, Select } from "../../utils/Input";


export function SectionFormOptimal() {
  const { values,
            errors,
            touched,
            setFieldValue,
            handleNext,
            handleChange,
            isSubmitting,
            handleBlur,
            validateField,
            setFieldTouched,
          } = useFormTargetThree()
  const {prevStep } = useStep()
  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Asignación de valores
      </h2>
      <div className="w-[80%] h-[420px] m-auto pt-2 flex flex-col justify-between" >
        <div className="flex flex-col justify-center gap-4">
          <div>
            <Input
              label="Óptimo"
              name="optimal"
              value={values.optimal}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="200"
              required
              error={touched.optimal && errors.optimal}
            />
             {touched.optimal && errors.optimal && (
                <div className="text-red-500 text-sm flex items-start">
                  <IconError></IconError>
                   <div>
                    {String(errors.optimal).split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
             )}
          </div>
          <div>
            <Input
                label="Tolerable"
                name="tolerable"
                value={values.tolerable}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="100"
                required
                error={touched.tolerable && errors.tolerable}
              />
              {touched.tolerable && errors.tolerable && (
                <div className="text-red-500 text-sm flex items-start">
                  <IconError></IconError>
                  {errors.tolerable}
                </div>
             )}
          </div>
          <div>
            <Input
                label="Deficiente"
                name="deficient"
                value={values.deficient}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="50"
                required
                error={touched.deficient && errors.deficient}
              />
              {touched.deficient && errors.deficient && (
                <div className="text-red-500 text-sm flex items-start">
                  <IconError></IconError>
                  {errors.deficient}
                </div>
             )}
          </div>
        </div>
        <div className="mt-8 flex flex-col">
             <Button
              type="submit"
              variant="primary"
            >
              Guardar
            </Button>
            <Button
              type="button"
              onClick={prevStep}
              variant="secondary"
              isDisabled={isSubmitting}
            >
              Volver
            </Button>
             </div>
      </div>
        
    </div>
  );
}
