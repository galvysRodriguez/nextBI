"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";
import { useExistTargetQuery } from "../exists/useExistTarget";
import { useValidation } from "./useValidation";
import { useFormActions } from "./useFormAction";

const requiredFields = ["title", "tag_id", "formula_id"];

export const useFormTargetOne = ({ isCreate, targetId }) => {
  const { nextStep } = useStep();
  const formik = useFormikContext();

  console.log(targetId)
  console.log(isCreate)
  
  const { refetch } = useExistTargetQuery(
    { title: formik.values.title, target_id: isCreate ? undefined : targetId },
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
    ...formik
  });

  return {
    ...formik,
    handleNext: () => handleSubmit(formik),
  };
};