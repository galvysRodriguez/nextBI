import { SectionTarget } from "app/app/components/target/SectionTarget";
import Image from "next/image";

export default function Home() {
  return (
    <>
        <SectionTarget content={"/targets/finance/"}
          title={"Perspectiva de clientes"}
        ></SectionTarget>
    </>
  );
}
