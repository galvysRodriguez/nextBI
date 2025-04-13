"use client";
import { Button, Input, Select } from "app/app/components/utils/Input";
import { useFormTagOne } from "../../hooks/validations/useFormTagOne";
import { IconError } from "../../utils/IconError";


export function SectionFormInfo({isCreate, tagId}) {
  const { values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldTouched,
      handleNext,
    } = useFormTagOne({isCreate, tagId})
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
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Título"
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
