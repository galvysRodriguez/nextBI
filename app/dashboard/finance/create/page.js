import { useSaveForm } from "app/app/components/hooks/useSaveForm";
import { SectionFormTarget } from "app/app/components/target/create/SectionFormTarget"
import StepForm from "app/app/components/container/create/StepForm";



export default function Home() {
  
  return (
    <>
        <StepForm initialStep={0}>
          <SectionFormTarget isCreate={true}></SectionFormTarget>
        </StepForm>
    </>
  );
}
