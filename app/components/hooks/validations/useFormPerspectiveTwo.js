"use client";
import { useFormikContext } from "formik";
import { showSuccessToast } from "../../utils/toast";
import { useParentRedirect } from "../useParentRedirect";

export const useFormPerspectiveTwo = () => {
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
    setFieldTouched("tags", true);
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    handleNext,
    validateField,
  };
};
