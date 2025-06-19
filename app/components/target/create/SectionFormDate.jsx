"use client";
import { Button } from "../../utils/Input";
import { useStep } from "../../context/StepContext";
import { useFormTargetTwo } from "../../hooks/validations/useFormTargetTwo";
import { IconError } from '../../utils/IconError';
import { InputDate } from "../../utils/InputDate";


export function SectionFormDateTarget({ isCreate }) {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleNext,
    setFieldTouched,
  } = useFormTargetTwo();

  const { prevStep, nextStep } = useStep();

  const handleDateChange = (field) => (date) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    setFieldValue(field, formattedDate);
    setFieldTouched(field, true, false);
  };

  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Seleccionar fechas
      </h2>
      <div className="w-[80%] h-[420px] m-auto pt-2 flex flex-col justify-between">
        <div className="w-full flex flex-col justify-center gap-4">
          <div>
              <InputDate
                label={"Fecha inicial"}
                name={"start_date"}
                values={values.start_date}
                error={touched.start_date && errors.start_date}
                handleDateChange={handleDateChange}
                disabled={isCreate}
              />
              {touched.start_date && errors.start_date && (
                <div className="text-red-500 text-sm flex items-start">
                  <IconError></IconError>
                  {errors.start_date}
                </div>
              )}
          </div>
          <div>
            <InputDate
                  label={"Fecha final"}
                  name={"end_date"}
                  values={values.end_date}
                  error={touched.end_date && errors.end_date}
                  handleDateChange={handleDateChange}
                />
              {touched.end_date && errors.end_date && (
                <div className="text-red-500 text-sm flex items-start">
                  <IconError></IconError>
                  {errors.end_date}
                </div>
              )}
          </div>    
          </div>
        <div className="mt-8 flex flex-col">
          <Button
              type="submit"
              variant="primary"
              onClick={handleNext}
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