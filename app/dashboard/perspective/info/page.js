import { SectionFormula } from "app/app/components/formula/SectionFormula"
import { GetTablePerspectives } from "app/app/components/perspective/GetTablePerspectives";

export default function Home() {
  return (
    <>
        <SectionFormula title={"Perspectivas"}>
            <GetTablePerspectives></GetTablePerspectives>
        </SectionFormula>
    </>
  );
}
