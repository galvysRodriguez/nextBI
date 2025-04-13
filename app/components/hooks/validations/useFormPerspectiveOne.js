"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";
import { useValidation } from "./useValidation";
import { useFormActions } from "./useFormAction";
import { useExistPerspectiveQuery } from "../exists/useExistPerspective";

const requiredFields = ["title", "icons"];

export const useFormPerspectiveOne = ({ isCreate, perspectiveId }) => {
  const { nextStep } = useStep();
  const formik = useFormikContext();
  const { isSubmitting, setSubmitting, setErrors } = formik;
  
  const { refetch } = useExistPerspectiveQuery(
    { title: formik.values.title, id: isCreate ? undefined : perspectiveId },
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