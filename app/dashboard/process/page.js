import { SectionTarget } from "app/app/components/target/SectionTarget";
import Image from "next/image";

export default function Home() {
  return (
    <>
        <SectionTarget content={"/targets/proccess/"}
            title={"Perspectiva de procesos internos"}
        ></SectionTarget>
    </>
  );
}
