import * as yup from 'yup';

export const targetSchema = yup.object().shape({
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
    .lessThan(yup.ref('optimal'), 'Debe ser menor que el valor óptimo')
    .moreThan(yup.ref('deficient'), 'Debe ser mayor que el valor deficiente'),
  optimal: yup
    .number()
    .typeError('Debe ser un número válido')
    .required('El valor óptimo es requerido')
    .moreThan(yup.ref('tolerable'), 'Debe ser mayor que el valor tolerable'),
  start_date: yup
    .date()
    .required('La fecha inicial es obligatoria')
    .max(yup.ref('end_date'), 'La fecha inicial no puede ser posterior a la final'),
  end_date: yup
    .date()
    .required('La fecha final es obligatoria')
    .min(yup.ref('start_date'), 'La fecha final no puede ser anterior a la inicial'),
  formula_id: yup
    .number()
    .required('La formula es obligatoria'),
  tag_id: yup
    .number()
    .required('La etiqueta es obligatoria'),
   
});