"use client";
import { Button, Input, Select } from "app/app/components/utils/Input";
import { useStep } from "app/app/components/context/StepContext";
import SelectMultiple from "../../utils/SelectMultiple";
import { useFormTagThree } from "../../hooks/validations/useFormTagThree";
import { IconError } from "../../utils/IconError";
import { usePerspectiveOption } from "../../hooks/options/usePerspectiveOption";
import { convertOption, mapIdsToArray } from "../../utils/convertOption";

export const mocksOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

export function SectionFormPerspective() {
  const { values,
        errors,
        touched,
        setFieldValue,
        handleNext,
        validateField,
        setFieldTouched,
        isSubmitting,
      } = useFormTagThree()

  const {prevStep} = useStep()
  const { data: dataPerspective, isLoading: isLoadingPerspective, error: errorPerspective } = usePerspectiveOption();

  const perspectivesOptions = convertOption(dataPerspective, "id", "title");

  return (
    <div>
      <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between">
          <div className="flex flex-col justify-center">
            <SelectMultiple
              label="Perspectivas"
              name="perspectives"
              value={perspectivesOptions.filter(opt =>
                values.perspectives.some(p => p.id === opt.value)
              )}
              required
              options={perspectivesOptions}
              onChange={(selectedOptions) => {
                const selectedIds = selectedOptions?.map(option => option.value) || [];
                setFieldValue('perspectives', mapIdsToArray(perspectivesOptions, selectedIds));
                setFieldTouched("perspectives", true, false);
              }}
              error={touched.perspectives && errors.perspectives}
              isDisabled={isLoadingPerspective || errorPerspective}
            >
            </SelectMultiple>
            {touched.perspectives && errors.perspectives && (
              <div className="text-red-500 text-sm flex items-start">
                <IconError></IconError>
                {errors.perspectives}
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
                    isDisabled={isSubmitting}
                >
                    Volver
                </Button>
            </div>
        </div>
    </div>
  );
}
