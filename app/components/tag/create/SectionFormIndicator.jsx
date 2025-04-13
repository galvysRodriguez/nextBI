"use client";
import { Button, Input, Select } from "app/app/components/utils/Input";
import { useStep } from "app/app/components/context/StepContext";
import SelectMultiple from "../../utils/SelectMultiple";
import { useFormTagTwo } from "../../hooks/validations/useFormTagTwo";
import { IconError } from "../../utils/IconError";
import { convertOption, mapIdsToArray } from "../../utils/convertOption";
import { useIndicatorOption } from "../../hooks/options/useIndicatorOption";

export const mocksOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

export function SectionFormIndicator() {
  const { values,
    errors,
    touched,
    setFieldValue,
    handleNext,
    validateField,
  } = useFormTagTwo()

  const {prevStep, nextStep} = useStep()
  const { data: dataIndicator, isLoading: isLoadingIndicator, error: errorIndicator } = useIndicatorOption();
  
    const indicatorsOptions = convertOption(dataIndicator, "id", "indicator");
  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Agregar indicadores
      </h2>
      <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between">
          <div className="flex flex-col justify-center">
            <SelectMultiple
              label="Indicadores"
              name="indicators"
              value={indicatorsOptions.filter(opt =>
                values.indicators.some(p => p.id === opt.value)
              )}
              onChange={(selectedOptions) => {
                const selectedIds = selectedOptions?.map(option => option.value) || [];
                setFieldValue('indicators', mapIdsToArray(indicatorsOptions, selectedIds));
                setFieldTouched("indicators", true, false);
              }}
              required
              options={indicatorsOptions}
              error={touched.indicators && errors.indicators}
              isDisabled={isLoadingIndicator || errorIndicator}
            >
            </SelectMultiple>
            {touched.indicators && errors.indicators && (
              <div className="text-red-500 text-sm flex items-start">
                <IconError></IconError>
                {errors.indicators}
              </div>
            )}
          </div>
          <div className="mt-8 flex flex-col">
                <Button
                    type="button"
                    onClick={handleNext}
                    variant="primary"
                >
                    Siguiente
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
