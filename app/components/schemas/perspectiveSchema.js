import * as yup from 'yup';

export const perspectiveSchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  icon_id: yup
    .number()
    .required('La etiqueta es obligatoria'),
  tags: yup
    .array()
    .min(1, 'Debe seleccionar al menos una etiqueta')
    .required('Las etiquetas son obligatorias')
});

