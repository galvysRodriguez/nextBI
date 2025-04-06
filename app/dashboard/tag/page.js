import { GetTableTags } from "app/app/components/categories/GetTableCategories";
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
