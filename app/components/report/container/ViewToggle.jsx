import { useReportLayout } from "../../context/reportLayout";
import { ContainerMenu, normalStyle, selectedStyle, SubtitleContainerMenu } from "./ContainerMenu";


export function ViewToggle(){
  const {setIsChart, isChart} = useReportLayout()
  return (
    <>
        <ContainerMenu>
            <SubtitleContainerMenu>Vista</SubtitleContainerMenu>
            <div className="flex flex-col gap-2 mb-4">
                <button onClick={setIsChart} className={!isChart ? selectedStyle : normalStyle}>Tablas</button>
                <button onClick={setIsChart} className={isChart ? selectedStyle : normalStyle}>Gráficas</button>
            </div>
        </ContainerMenu>
    </>
  );
}

