"use client";
import { Button, Input, Select } from "../../utils/Input";
import { SelectSimple } from "../../utils/SelectMultiple";
import { useFormTargetOne } from "../../hooks/validations/useFormTargetOne";
import { IconError } from "../../utils/IconError";
import { useTagOption } from "../../hooks/options/useTagOption";
import { convertOption } from "../../utils/convertOption";
import { useFormulaByTagOption } from "../../hooks/options/useFormulaByTagOption";

export const mocksOptions = [
  { value: 1, label: 'Chocolate' },
  { value: 2, label: 'Strawberry' },
  { value: 3, label: 'Vanilla' }
]

export function SectionFormInfo({isCreate, targetId}) {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    handleNext,
    handleChange,
    handleBlur,
    validateField,
    setFieldTouched,
  } = useFormTargetOne({isCreate, targetId});

  const { data: dataTag, isLoading: isLoadingTag, error: errorTag } = useTagOption();

  const { data: dataFormula, isLoading: isLoadingFormula, error: errorFormula } = useFormulaByTagOption(values.tag_id);

  const tagsOptions = convertOption(dataTag, "id", "title");
  const formulaOptions = convertOption(dataFormula, "id", "title");

  return (
    <div>
      <h2 className="text-xl text-center font-semibold mb-4">Definir Objetivo</h2>
      <div className="w-[80%] h-[420px] m-auto pt-2 flex flex-col justify-between">
        <div className="flex flex-col justify-center gap-4">
          <div>
            <Input
              label="Título"
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Título del objetivo"
              required
              error={touched.title && errors.title}
            />
            {touched.title && errors.title && (
              <div className="text-red-500 text-sm flex items-start">
                <IconError />
                {errors.title}
              </div>
            )}
          </div>
          <div>
            <SelectSimple
              label="Etiqueta"
              name="tag_id"
              value={tagsOptions.find(opt => opt.value === values.tag_id)}
              onChange={(selected) => {
                const tagValue = selected?.value ?? "";        
                setFieldValue("tag_id", tagValue);
                setFieldTouched("tag_id", true, false)
              }}
              options={tagsOptions}
              error={touched.tag_id && errors.tag_id}
              isDisabled={isLoadingTag || errorTag}
            />
            {touched.tag_id && errors.tag_id && (
              <div className="text-red-500 text-sm flex items-start">
                <IconError />
                {errors.tag_id}
              </div>
            )}
          </div>
          <div>
          <SelectSimple
              label="Fórmula"
              name="formula_id"
              value={formulaOptions.find(opt => opt.value === values.formula_id) || null}
              onChange={(selected) => {
                setFieldValue("formula_id", selected?.value ?? "");
                setFieldTouched("formula_id", true, false);
              }}
              options={formulaOptions}
              error={
                values.tag_id && touched.formula_id && errors.formula_id 
              }
              isDisabled={!values.tag_id || isLoadingFormula || errorFormula}
            />
            {values.tag_id && touched.formula_id && errors.formula_id && (
              <div className="text-red-500 text-sm flex items-start">
                <IconError />
                {errors.formula_id}
              </div>
            )}
            {!values.tag_id && (
              <p className="text-sm text-gray-500 mt-1">Selecciona una etiqueta para cargar fórmulas</p>
            )}
          </div>
        </div>
        <div className="mt-8">
          <Button type="button" onClick={handleNext} variant="primary">
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
