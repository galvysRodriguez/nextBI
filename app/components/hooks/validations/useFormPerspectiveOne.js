"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";
import { showSuccessToast } from "../../utils/toast";

export const useFormPerspectiveOne = () => {
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
    setFieldTouched("icons", true);

    const errors = await validateForm();
    if (!errors.title && !errors.icons) {
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
