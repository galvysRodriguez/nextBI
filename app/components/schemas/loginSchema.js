import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('El usuario es obligatorio'),
  hashed_password: yup
    .string()
    .required('La contraseña es obligatoria')
});