import * as yup from 'yup';

export const targetSchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es obligatorio')
    .max(100, 'El título no puede exceder 100 caracteres'),
  deficient: yup
    .number()
    .typeError("Debe ser un número válido")
    .required("El valor deficiente es requerido"),
    
  tolerable: yup
    .number()
    .typeError("Debe ser un número válido")
    .required("El valor tolerable es requerido"),
    
  optimal: yup
    .number()
    .typeError("Debe ser un número válido")
    .required("El valor óptimo es requerido")
    .test(
      "validate-relationship",
      "Los valores no cumplen con las relaciones requeridas",
      function (optimal) {
        const { tolerable, deficient } = this.parent;
        

        if (optimal > tolerable) {
          return deficient < tolerable && tolerable < optimal;
        }

        if (optimal < tolerable) {
          return optimal < tolerable && tolerable < deficient;
        }

        return false;
      }
    ),
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