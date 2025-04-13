"use client";
import { Formik, Form } from 'formik';
import { useStep } from "../../context/StepContext";
import { SectionFormInfo } from "./SectionFormInfo";
import { SectionFormPerspective } from "./SectionFormPerspective";
import { SectionFormIndicator } from './SectionFormIndicator';
import { tagSchema } from '../../schemas/tagSchema';
import { useSaveFormTag, useUpdateFormTag } from '../../hooks/create/useSaveTag';
import { useParentRedirect } from '../../hooks/useParentRedirect';
import { showSuccessToast } from '../../utils/toast';

const initialValues = {
  title: '',
  perspectives: [],
  indicators: [],
};


export function SectionFormTag({ isCreate, initialData=initialValues, tagId }) {
  const { activeStep } = useStep();
  const { mutate: create} = useSaveFormTag()
  const {mutate : update} = useUpdateFormTag()
  const { redirectToParent} = useParentRedirect()

  const handleSubmit = (values, { setSubmitting }) => {
    const mutation = isCreate ? create : update;
    const message = isCreate ? 'Guardado' : 'Actualizado';

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
      validationSchema={tagSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        {activeStep === 0 && <SectionFormInfo isCreate={isCreate} tagId={tagId}/>}
        {activeStep === 2 && <SectionFormPerspective isCreate={isCreate} />}
        {activeStep === 1 && <SectionFormIndicator isCreate={isCreate} />}
      </Form>
    </Formik>
  );
}