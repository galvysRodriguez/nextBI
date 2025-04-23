import { GetTableFormula } from "app/app/components/formula/GetTableFormula";
import { SectionFormula } from "app/app/components/formula/SectionFormula"

export default function Home() {
  return (
    <>
        <SectionFormula title={"Fórmulas"}>
          <GetTableFormula></GetTableFormula>
        </SectionFormula>
    </>
  );
}
