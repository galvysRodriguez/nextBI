"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";
import { useValidation } from "./useValidation";
import { useFormActions } from "./useFormAction";
import { useExistFormulaQuery } from "../exists/useExistFormula";

const requiredFields = ["title", "tag_id"];

export const useFormFormulaOne = ({ isCreate, formulaId }) => {
  const { nextStep } = useStep();
  const formik = useFormikContext();
  const { isSubmitting, setSubmitting, setErrors } = formik;

  console.log(formulaId)
  
  const { refetch } = useExistFormulaQuery(
    { title: formik.values.title, id: isCreate ? undefined : formulaId },
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