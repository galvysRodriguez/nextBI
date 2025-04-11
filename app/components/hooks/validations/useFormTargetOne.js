"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";

export const useFormTargetOne = () => {
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
    setFieldTouched("title", true);
    setFieldTouched("tag", true);
    setFieldTouched("formula_id", true);

    const errors = await validateForm();
    if (!errors.title && !errors.tag && !errors.formula_id) {
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
