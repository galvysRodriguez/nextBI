"use client";
import { Form, Formik } from "formik";
import { useStep } from "../../context/StepContext";
import { SectionFormEditor } from "./SectionFormEditor";
import { SectionFormInfo } from "./SectionFormInfo";
import { formulaSchema } from "../../schemas/formulaSchema";
import { useSaveFormFormula, useUpdateFormFormula } from "../../hooks/create/useSaveFormula";
import { useParentRedirect } from "../../hooks/useParentRedirect";
import { showSuccessToast } from "../../utils/toast";

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

   const handleSubmit = (values, { setSubmitting }) => {
    console.log("value")
    const mutation = isCreate ? create : update;
    const message = isCreate ? 'Guardado' : 'Actualizado';

    console.log(formulaId)

    mutation(values, {
      onSuccess: () => {
        setSubmitting(false);
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
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={formulaSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        {activeStep === 0 && <SectionFormInfo isCreate={isCreate} formulaId={formulaId}/>}
        {activeStep === 1 && <SectionFormEditor isCreate={isCreate} />}
      </Form>
    </Formik>
  );
}