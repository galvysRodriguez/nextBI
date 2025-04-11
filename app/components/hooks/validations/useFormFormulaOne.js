"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";

export const useFormFormulaOne = () => {
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
    setFieldTouched("title", true);
    setFieldTouched("tag", true);

    const errors = await validateForm();
    if (!errors.title && !errors.tag) {
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
