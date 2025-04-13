import { useCallback } from 'react';

export const useValidation = ({ requiredFields, refetch }) => {
  const validateRequiredFields = useCallback(async (formikContext) => {
    const { touched, setFieldTouched, validateForm } = formikContext;
    
    requiredFields.forEach(field => {
      if (!touched[field]) setFieldTouched(field, true, false);
    });
    
    const validationErrors = await validateForm();
    return requiredFields.some(field => !!validationErrors[field]);
  }, [requiredFields]);

  const checkTitleExists = useCallback(async () => {
    try {
      const { data: result } = await refetch();
      return result?.data;
    } catch (error) {
      throw new Error('Error al validar el título');
    }
  }, [refetch]);

  return {
    validateRequiredFields,
    checkTitleExists
  };
};