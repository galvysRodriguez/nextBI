import { SectionTarget } from "app/app/components/target/SectionTarget";
import Image from "next/image";

export default async function Home({params}) {
 const id = (await params).id;
 
  return (
    <>
        <SectionTarget content={`/targets/perspective/${id}`}
          id={id}
        ></SectionTarget>
    </>
  );
}
