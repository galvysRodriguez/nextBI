"use client";
import { Form, Formik } from "formik";
import { useStep } from "../../context/StepContext";
import { SectionFormEditor } from "./SectionFormEditor";
import { SectionFormInfo } from "./SectionFormInfo";
import { formulaSchema } from "../../schemas/formulaSchema";
import { useSaveFormFormula, useUpdateFormFormula } from "../../hooks/create/useSaveFormula";
import { useParentRedirect } from "../../hooks/useParentRedirect";
import { showSuccessToast } from "../../utils/toast";
import { useEffect } from "react";
import { useIndicatorsValid } from "../../hooks/indicator/useIndicatorsValid";
import { useIndicatorsValidContext } from "../../context/useIndicatorsValidContext";
import { useCardStore } from "../../context/IsGrid";

const initialValues = {
  title: '',
  tag_id: '',
  formula: '',
};

export function SectionFormFormula({ isCreate, initialData=initialValues, formulaId }) {
   const{activeStep}= useStep()
   const { mutate: create} = useSaveFormFormula()
   const { mutate: update} = useUpdateFormFormula()
   const {redirectToParent} = useParentRedirect()
   const{indicatorsValid} = useIndicatorsValidContext()
   const {clearSelection} = useCardStore()

   const handleSubmit = (values, { setSubmitting }) => {
    const mutation = isCreate ? create : update;
    const message = isCreate ? 'Guardado' : 'Actualizado';

    console.log(formulaId)

    mutation(values, {
      onSuccess: () => {
        setSubmitting(false);
        clearSelection()
        showSuccessToast(`${message} exitosamente`);
        redirectToParent()
      },
      onError: (error) => {
        console.error(`Error al ${isCreate ? 'crear' : 'actualizar'} el formulario:`, error);
        setSubmitting(false);
      },
    });
  };


  return (
    <Formik
      initialValues={initialData}
      enableReinitialize
      validateOnChange={true}
      validateOnBlur={true}
      //validationSchema={formulaSchema}
      onSubmit={handleSubmit}
      validate={async (values) => {
      try {
        const validCommands = indicatorsValid?.map(ind => ind.indicator) || [];
        console.log("validCommands", validCommands)
        await formulaSchema.validate(values, {
          abortEarly: false,
          context: { validCommands },
        });
        return {};
      } catch (err) {
        const errors = {};
        if (err.inner && Array.isArray(err.inner)) {
          err.inner.forEach((e) => {
            if (e.path) {
              errors[e.path] = e.message;
            }
          });
        } else if (err.path) {
          errors[err.path] = err.message;
        }
        return errors;
      }

    }}
    >
      <Form>
        {activeStep === 0 && <SectionFormInfo isCreate={isCreate} formulaId={formulaId}/>}
        {activeStep === 1 && <SectionFormEditor isCreate={isCreate} />}
      </Form>
    </Formik>
  );
}