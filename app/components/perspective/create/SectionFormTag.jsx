"use client";
import { useFormikContext } from 'formik';
import { Button } from "app/app/components/utils/Input";
import SelectMultiple from "../../utils/SelectMultiple";
import { useStep } from "app/app/components/context/StepContext";

export const mocksOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export function SectionFormTag() {
  const { prevStep } = useStep();
  const {
    values,
    errors,
    touched,
    setFieldValue,
    validateField,
    handleSubmit,
    setFieldTouched,
    validateForm,
  } = useFormikContext();

  const handleNext = async () => {
    // Marcar campos como touched y validar
    setFieldTouched('tags', true);
    
    const errors = await validateForm();
    if (!errors.tags) {
      handleSubmit()
    }
  };

  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Agregar etiquetas
      </h2>
      <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between">
        <div className="flex flex-col justify-center">
          <SelectMultiple
            label="Etiquetas"
            name="tags"
            value={values.tags}
            onChange={(selected) => {
              setFieldValue('tags', selected);
              validateField('tags');
            }}
            required
            options={mocksOptions}
            error={touched.tags && errors.tags}
          />
          {touched.tags && errors.tags && (
            <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
          )}
        </div>
        <div className="mt-8 flex flex-col">
          <Button
            type="submit"
            variant="primary"
            onClick={handleNext}
          >
            Guardar
          </Button>
          <Button
            type="button"
            onClick={prevStep}
            variant="secondary"
          >
            Volver
          </Button>
        </div>
      </div>
    </div>
  );
}