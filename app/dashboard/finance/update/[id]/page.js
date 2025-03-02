
import StepForm from "app/app/components/target/create/SectionFormTarget";

const url = `${process.env.NEXT_PUBLIC_API_URL || ""}/targets`

export default async function Home({ params }) {
  const id = (await params).id;
  const initialData = await fetchDataFromServer(id);
  
  return (
    <>
        <StepForm isCreate={false} initialStep={1} initialData={initialData.data}></StepForm>
    </>
  );
}

export async function fetchDataFromServer(id) {
  const response = await fetch(`${url}/${id}`);
  if (!response.ok) {
    throw new Error('Error al obtener los datos');
  }
  return response.json();
}

/*<ManageUpdate id={id} isCreate={true} activeStep={1}></ManageUpdate>*/