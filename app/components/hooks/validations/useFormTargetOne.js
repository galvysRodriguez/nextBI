"use client";
import { useFormikContext } from "formik";
import { useStep } from "app/app/components/context/StepContext";
import { useExistTarget, useExistTargetUpdate } from "../exists/useExistTarget";


export const useFormTargetOne = ({ isCreate, targetId}) => {
  const { nextStep } = useStep();
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
    setErrors,
  } = useFormikContext();

  const createTargetCheck = useExistTarget();
  const updateTargetCheck = useExistTargetUpdate();

  const handleNext = async () => {
    // Marcar campos como touched
    setFieldTouched("title", true);
    setFieldTouched("tag_id", true);
    setFieldTouched("formula_id", true);
  
    // Validar primero los campos requeridos
    const validationErrors = await validateForm();
    
    if (validationErrors.title || validationErrors.tag_id || validationErrors.formula_id) {
      return;
    }
  
    const payload = { title: values.title };
    try {
      let response;
      
      if (!isCreate) {
        if (!targetId) {
          setErrors({
            ...errors,
            title: "Se requiere un ID válido para actualizar"
          });
          return;
        }
        response = await updateTargetCheck.mutateAsync({ 
          formData: payload, 
          id: targetId 
        });
      } else {
        response = await createTargetCheck.mutateAsync(payload);
      }
  
      if (response?.data === true) {
        setErrors({
          ...errors,
          title: "Este título ya está registrado"
        });
        setFieldTouched("title", true, false);
        return;
      }
      
      nextStep();
    } catch (err) {
      setErrors({
        ...errors,
        title: "Este título ya está registrado"
      });
      setFieldTouched("title", true, false);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    validateField,
    setFieldTouched,
    handleNext,
  };
};
