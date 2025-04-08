"use client";
import { Formik, Form } from 'formik';
import { useStep } from "../../context/StepContext";
import { SectionFormInfo } from "./SectionFormInfo";
import { SectionFormPerspective } from "./SectionFormPerspective";
import { SectionFormIndicator } from './SectionFormIndicator';
import { tagSchema } from '../../schemas/tagSchema';
import { useSaveFormula } from "../../hooks/useFormula";

export function SectionFormTag({ isCreate }) {
  const { activeStep } = useStep();
  const { mutate } = useSaveFormula();

  const initialValues = {
    title: '',
    perspectives: [],
    indicators: [],
  };

  const handleSubmit = (values, { setSubmitting }) => {
    //mutate(values);
    console.log("values", {values})
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={tagSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        {activeStep === 0 && <SectionFormInfo />}
        {activeStep === 2 && <SectionFormPerspective isCreate={isCreate} />}
        {activeStep === 1 && <SectionFormIndicator isCreate={isCreate} />}
      </Form>
    </Formik>
  );
}