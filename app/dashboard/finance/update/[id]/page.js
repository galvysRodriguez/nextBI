import StepForm from "app/app/components/target/create/SectionFormTarget";

export default async function Home({ params }) {
  const id = (await params).id;
  return (
    <>
        <StepForm isCreate={false} initialStep={1}></StepForm>
    </>
  );
}


/*<ManageUpdate id={id} isCreate={true} activeStep={1}></ManageUpdate>*/