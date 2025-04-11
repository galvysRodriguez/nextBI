"use client";
import { useFormikContext } from "formik";
import { showSuccessToast } from "../../utils/toast";
import { useParentRedirect } from "../useParentRedirect";


export const useFormFormulaTwo = () => {
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
  } = useFormikContext();
  const { redirectToParent } = useParentRedirect();

  const handleNext = async () => {

    const errors = await validateForm();
    if (!errors.formula) {
        showSuccessToast('!Guardado exitosamente!')
        //handleSubmit()
        redirectToParent()
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
    validateField,
    validateForm,
    handleNext,
  };
};
