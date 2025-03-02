import { useSaveForm } from "app/app/components/hooks/useSaveForm";
import StepForm from "app/app/components/target/create/SectionFormTarget";



export default function Home() {
  
  return (
    <>
        <StepForm isCreate={true} initialStep={0}></StepForm>
    </>
  );
}
