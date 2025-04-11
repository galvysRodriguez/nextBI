"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";

export const useFormTargetTwo = () => {
  const { nextStep } = useStep();
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    validateForm,
  } = useFormikContext();

  const handleNext = async () => {
    setFieldTouched("start_date", true);
    setFieldTouched("end_date", true);

    const errors = await validateForm();
    if (!errors.start_date && !errors.end_date) {
        //showSuccessToast('!Guardado exitosamente!')
        nextStep();
      };
    
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    handleNext,
  };
};
