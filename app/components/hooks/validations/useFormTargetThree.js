"use client";
import { useFormikContext } from "formik";
import { showSuccessToast } from "../../utils/toast";
import { useParentRedirect } from "../useParentRedirect";


export const useFormTargetThree = () => {
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
    setFieldTouched("optimal", true);
    setFieldTouched("tolerable", true);
    setFieldTouched("deficient", true);
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    validateField,
    validateForm,
    isSubmitting,
    handleNext,
  };
};
