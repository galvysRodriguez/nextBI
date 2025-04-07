"use client";
import { useFormikContext } from 'formik';
import { Button, Input } from "app/app/components/utils/Input";
import { SelectSimple } from "../../utils/SelectMultiple";
import { mocksOptions } from "./SectionFormTag";
import { useStep } from "app/app/components/context/StepContext";
import { IconError } from '../../utils/IconError';

export function SectionFormInfo() {
  const { nextStep } = useStep();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    validateForm
  } = useFormikContext();

  const handleNext = async () => {
    // Marcar campos como touched y validar
    setFieldTouched('title', true);
    setFieldTouched('icons', true);
    
    const errors = await validateForm();
    if (!errors.title && !errors.icons) {
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Información General
      </h2>
      <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between">
        <div className="flex flex-col justify-center gap-4">
          <div>
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
          
          <div>
            <SelectSimple
              label="Ícono"
              name="icons"
              value={values.icons}
              onChange={(value) => {
                setFieldTouched('icons', true, false);
                setFieldValue('icons', value, true);
              }}
              onBlur={() => setFieldTouched('icons', true)}
              options={mocksOptions}
              required
              error={touched.icons && errors.icons}
            />
            {touched.icons && errors.icons && (
              <div className="text-red-500 text-sm flex items-start">
               <IconError></IconError>
                {errors.icons}
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