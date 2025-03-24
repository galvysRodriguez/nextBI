import StepForm from "app/app/components/target/create/SectionFormTarget";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/targets`

export default async function Home({ params }) {
  const id = (await params).id;
 
  
  return (
    <>
        <h1>{id}</h1>
    </>
  );
}
