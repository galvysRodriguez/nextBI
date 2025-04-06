import * as yup from 'yup';

export const objectiveSchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es obligatorio')
    .max(100, 'El título no puede exceder 100 caracteres'),
  deficient: yup
    .number()
    .typeError('Debe ser un número válido')
    .required('El valor deficiente es requerido')
    .lessThan(yup.ref('tolerable'), 'Debe ser menor que el valor tolerable'),
  tolerable: yup
    .number()
    .typeError('Debe ser un número válido')
    .required('El valor tolerable es requerido')
    .lessThan(yup.ref('optime'), 'Debe ser menor que el valor óptimo')
    .moreThan(yup.ref('deficient'), 'Debe ser mayor que el valor deficiente'),
  optime: yup
    .number()
    .typeError('Debe ser un número válido')
    .required('El valor óptimo es requerido')
    .moreThan(yup.ref('tolerable'), 'Debe ser mayor que el valor tolerable'),
  start_date: yup
    .date()
    .required('La fecha de inicio es obligatoria')
    .max(yup.ref('end_date'), 'La fecha de inicio no puede ser posterior a la fecha final'),
  end_date: yup
    .date()
    .required('La fecha final es obligatoria')
    .min(yup.ref('start_date'), 'La fecha final no puede ser anterior a la fecha de inicio'),
  formula: yup
    .string()
    .required('La fórmula es obligatoria')
    .matches(
      /^[a-zA-Z0-9+\-*/() ]+$/,
      'La fórmula solo puede contener números, letras y operadores básicos'
    )
});