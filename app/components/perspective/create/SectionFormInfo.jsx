"use client";
import { Button, Input } from "app/app/components/utils/Input";
import { SelectSimple } from "../../utils/SelectMultiple";
import { mocksOptions } from "./SectionFormTag";
import { IconError } from '../../utils/IconError';
import { useFormPerspectiveOne } from '../../hooks/validations/useFormPerspectiveOne';
import { useIconOption } from "../../hooks/options/useIconOption";
import { convertOption } from "../../utils/convertOption";


export function SectionFormInfo({isCreate, perspectiveId}) {
  const { values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    handleNext,
  } = useFormPerspectiveOne({isCreate, perspectiveId})

  const { data: dataIcon, isLoading: isLoadingIcon, error: errorIcon } = useIconOption();
  const iconsOptions = convertOption(dataIcon, "id", "icon");

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
              label="Ícono"
              name="icon_id"
              value={iconsOptions.find(opt => opt.value === values.icon_id) || null}
              onChange={(selected) => {
                setFieldValue('icon_id', selected?.value ?? "");
                setFieldTouched('icon_id', true, false);
              }}
              options={iconsOptions}
              required
              error={touched.icon_id && errors.icon_id}
              isDisabled={isLoadingIcon || errorIcon}
            />
            {touched.icon_id && errors.icon_id && (
              <div className="text-red-500 text-sm flex items-start">
               <IconError></IconError>
                {errors.icon_id}
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