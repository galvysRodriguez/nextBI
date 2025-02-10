import { SectionTarget } from "app/app/components/target/SectionTarget";
import Image from "next/image";

export default function Home() {
  return (
    <>
        <SectionTarget content={"/targets/customer/"}
            title={"Perspectiva de clientes"}
        >
        </SectionTarget>
    </>
  );
}
