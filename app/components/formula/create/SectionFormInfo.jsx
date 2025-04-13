"use client";
import { Button, Input, Select } from "app/app/components/utils/Input";
import { SelectSimple } from "../../utils/SelectMultiple";
import { useFormFormulaOne } from "../../hooks/validations/useFormFormulaOne";
import { IconError } from "../../utils/IconError";
import { useTagOption } from "../../hooks/options/useTagOption";
import { convertOption } from "../../utils/convertOption";

export const mocksOptions = [
  { value: 1, label: 'Chocolate' },
  { value: 2, label: 'Strawberry' },
  { value: 3, label: 'Vanilla' }
]

export function SectionFormInfo({isCreate, formulaId}) {
   const { values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
      setFieldTouched,
      handleNext,
    } = useFormFormulaOne({isCreate, formulaId})

    console.log(formulaId)

  const { data: dataTag, isLoading: isLoadingTag, error: errorTag } = useTagOption()
  const tagsOptions = convertOption(dataTag, "id", "title");
  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">
        Información general
      </h2>
      <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between">
          <div className="flex flex-col justify-center gap-4">
            <div>
              <Input
                label="Título"
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Título"
                required
                error={touched.title && errors.title}
              />
               {touched.title && errors.title && (
                  <div className="text-red-500 text-sm flex items-start">
                    <IconError></IconError>
                    {errors.title}
                  </div>
                )}
            </div>
            <div>
              <SelectSimple
                label="Etiqueta"
                name="tag_id"
                value={tagsOptions.find(opt => opt.value === values.tag_id) || null}
                onBlur={handleBlur}
                onChange={(selected) => {
                  setFieldValue('tag_id', selected?.value ?? '');
                  setFieldTouched('tag_id', true, false);
                }}
                options={tagsOptions}
                error={touched.tag_id && errors.tag_id}
                isDisabled={isLoadingTag || errorTag}
              >
              </SelectSimple>
              {touched.tag_id && errors.tag_id && (
                <div className="text-red-500 text-sm flex items-start">
                    <IconError></IconError>
                    {errors.tag_id}
                </div>
              )}
            </div>
          </div>
          <div className="mt-8">
            <Button
              type="button"
              onClick={handleNext}
              variant="primary"
            >
              Siguiente
            </Button>
          </div>
        </div>
    </div>
  );
}
