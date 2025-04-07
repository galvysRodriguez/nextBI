"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";

export const useFormTagTwo = () => {
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
    validateField,
  } = useFormikContext();

  const handleNext = async () => {
    setFieldTouched("indicators", true);

    const errors = await validateForm();
    if (!errors.indicators) {
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
    validateField,
    setFieldTouched,
    handleNext,
  };
};
