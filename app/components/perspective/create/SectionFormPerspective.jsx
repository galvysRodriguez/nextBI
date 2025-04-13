"use client";
import { Formik, Form } from 'formik';
import { useStep } from "../../context/StepContext";
import { SectionFormInfo } from "./SectionFormInfo";
import { SectionFormTag } from "./SectionFormTag";
import { perspectiveSchema } from '../../schemas/perspectiveSchema';
import { useSaveFormPerspective, useUpdateFormPerspective } from '../../hooks/create/useSavePerspective';
import { showSuccessToast } from '../../utils/toast';
import { useParentRedirect } from '../../hooks/useParentRedirect';

const initialValues = {
  title: '',
  icon_id: '',
  tags: [],
};

export function SectionFormPerspective({ isCreate, initialData=initialValues, perspectiveId }) {
  const { activeStep } = useStep();
  const { mutate: create} = useSaveFormPerspective()
  const { mutate: update} = useUpdateFormPerspective()
  const { redirectToParent } = useParentRedirect();

  console.log("initialData", initialData)
  
    const handleSubmit = (values, { setSubmitting }) => {
      const mutation = isCreate ? create : update;
      const message = isCreate ? 'Guardado' : 'Actualizado';
  
      mutation(values, {
        onSuccess: () => {
          setSubmitting(false)
          showSuccessToast(`${message} exitosamente`);
          redirectToParent()
        },
        onError: (error) => {
          console.error(`Error al ${isCreate ? 'crear' : 'actualizar'} el formulario:`, error);
          setSubmitting(false)
        },
      });
    };

  return (
    <Formik
      initialValues={initialData}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={perspectiveSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        {activeStep === 0 && <SectionFormInfo isCreate={isCreate} perspectiveId={perspectiveId}/>}
        {activeStep === 1 && <SectionFormTag isCreate={isCreate} />}
      </Form>
    </Formik>
  );
}