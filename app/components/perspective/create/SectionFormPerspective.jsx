"use client";
import { Formik, Form } from 'formik';
import { useStep } from "../../context/StepContext";
import { SectionFormInfo } from "./SectionFormInfo";
import { SectionFormTag } from "./SectionFormTag";
import { perspectiveSchema } from '../../schemas/perspectiveSchema';
import { useSaveFormula } from "../../hooks/useFormula";

const initialValues = {
  title: '',
  icons: null,
  tags: [],
};

export function SectionFormPerspective({ isCreate }) {
  const { activeStep } = useStep();
  const { mutate } = useSaveFormula();

  const handleSubmit = (values, { setSubmitting }) => {
    //mutate(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={perspectiveSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        {activeStep === 0 && <SectionFormInfo />}
        {activeStep === 1 && <SectionFormTag isCreate={isCreate} />}
      </Form>
    </Formik>
  );
}