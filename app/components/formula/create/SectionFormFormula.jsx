"use client";
import { Form, Formik } from "formik";
import { useStep } from "../../context/StepContext";
import { useDataForm } from "../../context/useDataForm";
import { useSaveFormula } from "../../hooks/useFormula";
import { SectionFormEditor } from "./SectionFormEditor";
import { SectionFormInfo } from "./SectionFormInfo";
import { formulaSchema } from "../../schemas/formulaSchema";

const initialValues = {
  title: '',
  tag: null,
  formula: '',
};

export function SectionFormFormula({ isCreate }) {
   const{activeStep}= useStep()
   const { mutate} = useSaveFormula();
   const handleSubmit = (values, { setSubmitting }) => {
    //mutate(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={formulaSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        {activeStep === 0 && <SectionFormInfo />}
        {activeStep === 1 && <SectionFormEditor isCreate={isCreate} />}
      </Form>
    </Formik>
  );
}