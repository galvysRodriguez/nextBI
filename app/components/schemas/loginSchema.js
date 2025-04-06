import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('El usuario es obligatorio')
    .min(4, 'El usuario debe tener al menos 4 caracteres')
    .max(50, 'El usuario no puede exceder 50 caracteres'),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
});