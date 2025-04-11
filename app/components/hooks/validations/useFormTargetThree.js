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
  } = useFormikContext();
  const { redirectToParent } = useParentRedirect();

  const handleNext = async () => {
    setFieldTouched("optimal", true);
    setFieldTouched("tolerable", true);
    setFieldTouched("deficient", true);

    const errors = await validateForm();
    if (!errors.optimal && !errors.tolerable && !errors.deficient) {
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
