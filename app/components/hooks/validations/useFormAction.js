import { useCallback } from 'react';

export const useFormActions = ({ 
  validateRequiredFields,
  checkTitleExists,
  nextStep,
  setErrors,
  setSubmitting
}) => {
  const handleSubmit = useCallback(async (formikContext) => {
    if (formikContext.isSubmitting) return;
    setSubmitting(true);
    try {
      const fieldErrors = await validateRequiredFields(formikContext);
      if (fieldErrors) {
        return; 
      }
      const exists = await checkTitleExists();
      if (exists) {
        setErrors({ title: "Este título ya está registrado" });
        return;
      }
      nextStep();
    } catch (error) {
      setErrors({ title: error.message || "Error de validación" });
    } finally {
      setSubmitting(false);
    }
  }, [validateRequiredFields, checkTitleExists, nextStep, setErrors, setSubmitting]);

  return {
    handleSubmit
  };
};