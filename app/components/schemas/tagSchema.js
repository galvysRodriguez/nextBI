import * as yup from 'yup';

export const tagSchema = yup.object().shape({
    title: yup
      .string()
      .required('El título es obligatorio')
      .min(5, 'El título debe tener al menos 5 caracteres')
      .max(100, 'El título no puede exceder 100 caracteres'),
    indicators: yup
      .array()
      .min(1, 'Debe seleccionar al menos una variable')
      .required('Las variables son obligatorios'),
    perspectives: yup
      .array()
      .min(1, 'Debe seleccionar al menos una perspectiva')
      .required('Las perspectivas son obligatorias')
  });