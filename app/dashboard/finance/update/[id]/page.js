import StepForm from "app/app/components/target/create/SectionFormTarget";

export default function Home() {
  return (
    <>
        <StepForm isCreate={false} initialStep={1}></StepForm>
    </>
  );
}
