"use client";
import { Formik, Form } from 'formik';
import { useSaveForm, useUpdateForm } from "../../hooks/useSaveForm";
import { SectionFormDateTarget } from "./SectionFormDate";
import { SectionFormOptimal } from "./SectionFormOptimal";
import { SectionFormInfo } from "./SectionFormInfo";
import { useStep } from "../../context/StepContext";
import { targetSchema } from "../../schemas/targetSchema";
import { showSuccessToast } from '../../utils/toast';
import { useParentRedirect } from '../../hooks/useParentRedirect';
import { useCardStore } from '../../context/IsGrid';

const today = new Date().toISOString().split("T")[0];

const initialValues = {
  title: "",
  formula_id: "",
  start_date: today,
  end_date: "",
  optimal: "",
  tolerable: "",
  deficient: "",
  tag_id: "",
};

export function SectionFormTarget({ isCreate, initialData=initialValues, targetId, perspectiveId }) {
  const { mutate: create } = useSaveForm();
  const { mutate: update } = useUpdateForm();
  const{activeStep}= useStep()
  const { redirectToParent } = useParentRedirect();
   const {clearSelection} = useCardStore()

  const handleSubmit = (values, { setSubmitting }) => {
    const mutation = isCreate ? create : update;
    const message = isCreate ? 'Guardado' : 'Actualizado';
    
    const formattedValues = {
      ...values,
      start_date: new Date(values.start_date).toISOString().split("T")[0],
      end_date: values.end_date ? new Date(values.end_date).toISOString().split("T")[0] : ""
    };
  
    mutation(formattedValues, {
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
      validateOnChange={true}
      validateOnBlur={true}
      onSubmit={handleSubmit}
      validationSchema={targetSchema}
      enableReinitialize={true}
    >
      <Form>
        {activeStep === 0 && <SectionFormInfo isCreate={isCreate} targetId={targetId} perspectiveId={perspectiveId} />}
        {activeStep === 1 && <SectionFormDateTarget isCreate={isCreate} />}
        {activeStep === 2 && <SectionFormOptimal />}
      </Form>
    </Formik>
  );
}