import { GetTableTags } from "app/app/components/categories/GetTableTags";
import { SectionFormula } from "app/app/components/formula/SectionFormula"

export default function Home() {
  return (
    <>
        <SectionFormula title={"Etiquetas"}>
            <GetTableTags></GetTableTags>
        </SectionFormula>
    </>
  );
}
