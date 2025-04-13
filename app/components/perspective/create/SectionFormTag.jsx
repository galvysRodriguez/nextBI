"use client";
import { Button } from "app/app/components/utils/Input";
import SelectMultiple from "../../utils/SelectMultiple";
import { useStep } from "app/app/components/context/StepContext";
import { useFormPerspectiveTwo } from '../../hooks/validations/useFormPerspectiveTwo';
import { IconError } from '../../utils/IconError';
import { useTagOption } from '../../hooks/options/useTagOption';
import { convertOption, mapIdsToArray } from '../../utils/convertOption';

export const mocksOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

export function SectionFormTag() {
  const { prevStep } = useStep();
  const { values,
      errors,
      touched,
      setFieldValue,
      handleNext,
      validateField,
    } = useFormPerspectiveTwo()

  const { data: dataTag, isLoading: isLoadingTag, error: errorTag } = useTagOption();
  const tagsOptions = convertOption(dataTag, "id", "title");

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
            value={tagsOptions.filter(opt =>
              values.tags.some(p => p.id === opt.value)
            )}
            onChange={(selectedOptions) => {
              const selectedIds = selectedOptions?.map(option => option.value) || [];
              setFieldValue('tags', mapIdsToArray(indicatorsOptions, selectedIds));
              setFieldTouched("tags", true, false);
            }}
            required
            options={tagsOptions}
            error={touched.tags && errors.tags}
            isDisabled={isLoadingTag || errorTag}
          />
          {touched.tags && errors.tags && (
            <div className="text-red-500 text-sm flex items-start">
              <IconError></IconError>
              {errors.tags}
            </div>
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