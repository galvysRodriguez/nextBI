import * as yup from 'yup';

export const perspectiveSchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  icons: yup
    .mixed()
    .nullable()
    .required('Debe seleccionar un icono'),
  tags: yup
    .array()
    .min(1, 'Debe seleccionar al menos una etiqueta')
    .required('Las etiquetas son obligatorias')
});

