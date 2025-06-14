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
import { useCardStore } from '../../context/IsGrid';

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
   const {clearSelection} = useCardStore()

  const handleSubmit = (values, { setSubmitting }) => {
    const mutation = isCreate ? create : update;
    const message = isCreate ? 'Guardado' : 'Actualizado';

    const formattedValues = {
      ...values,
      perspectives: values.perspectives.map(perspective => typeof perspective === 'object' ? perspective.id : perspective),
      indicators: values.indicators.map(indicator => typeof indicator === 'object' ? indicator.id : indicator)
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