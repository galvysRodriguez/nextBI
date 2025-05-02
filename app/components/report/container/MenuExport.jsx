import { useReportLayout } from "../../context/reportLayout";
import { useReportFormat } from "../../context/useReportFormat";
import { useReportScope } from "../../context/useReportScope";
import { ButtonExport } from "./ButtonExport";
import { ContainerMenu, normalStyle, selectedStyle, SubtitleContainerMenu } from "./ContainerMenu";


export function MenuExport({initialColumns}){
    const { format, setFormat} = useReportFormat()
    const { setScope, scope} = useReportScope()

    return (
        <>
            <ContainerMenu>
                    <SubtitleContainerMenu>Formato de exportación</SubtitleContainerMenu>
                    <div className="flex gap-2 mb-4">
                        <button onClick={() => setFormat('pdf')} className={format === 'pdf' ? selectedStyle : normalStyle}>PDF</button>
                        <button onClick={() => setFormat('excel')} className={format === 'excel' ? selectedStyle : normalStyle}>Excel</button>
                        <button onClick={() => setFormat('csv')} className={format === 'csv' ? selectedStyle : normalStyle}>CSV</button>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <button 
                            onClick={() => setFormat('png')} 
                            className={format === 'png' ? selectedStyle : normalStyle}
                        >
                            PNG
                        </button>
                        <button 
                            onClick={() => setFormat('svg')} 
                            className={format === 'svg' ? selectedStyle : normalStyle}
                        >
                            SVG
                        </button>
                    </div>
                    <SubtitleContainerMenu>Filas</SubtitleContainerMenu>
                    <div className="flex flex-col gap-2 mb-4">
                        <button onClick={() => setScope('current')} className={scope === 'current' ? selectedStyle : normalStyle}>Página actual</button>
                        <button onClick={() => setScope('all')} className={scope === 'all' ? selectedStyle : normalStyle}>Todas las páginas</button>
                    </div>
                    <ButtonExport initialColumns={initialColumns}></ButtonExport>
            </ContainerMenu>
        </>
            
    )
}