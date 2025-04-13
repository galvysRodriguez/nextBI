"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";
import { useValidation } from "./useValidation";
import { useFormActions } from "./useFormAction";
import { useExistTagQuery } from "../exists/useExistTag";

const requiredFields = ["title"];

export const useFormTagOne = ({ isCreate, tagId }) => {
  const { nextStep } = useStep();
  const formik = useFormikContext();
  const { isSubmitting, setSubmitting, setErrors } = formik;
  
  const { refetch } = useExistTagQuery(
    { title: formik.values.title, id: isCreate ? undefined : tagId },
    { enabled: false }
  );

  const { validateRequiredFields, checkTitleExists } = useValidation({
    requiredFields,
    refetch
  });

  const { handleSubmit } = useFormActions({
    validateRequiredFields,
    checkTitleExists,
    nextStep,
    setErrors,
    setSubmitting
  });

  return {
    ...formik,
    handleNext: () => handleSubmit(formik),
  };
};