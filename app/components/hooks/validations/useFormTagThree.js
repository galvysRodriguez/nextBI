"use client";
import { useFormikContext } from "formik";
import { showSuccessToast } from "../../utils/toast";
import { useParentRedirect } from "../useParentRedirect";


export const useFormTagThree = () => {
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
    handleSubmit,
    isSubmitting,
  } = useFormikContext();
  const { redirectToParent } = useParentRedirect();

  const handleNext = async () => {
    setFieldTouched("perspectives", true);
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    isSubmitting,
    setFieldTouched,
    validateField,
    validateForm,
    handleNext,
  };
};
