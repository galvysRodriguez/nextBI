import { GetTableFormula, SectionFormula } from "app/app/components/formula/SectionFormula"

export default function Home() {
  return (
    <>
        <SectionFormula title={"Formulas"}>
          <GetTableFormula></GetTableFormula>
        </SectionFormula>
    </>
  );
}
