import { useReportLayout } from "../../context/reportLayout";
import { useReportMenu } from "../../context/useReportMenu";


export function ButtonExport(){
    const {setIsMenuOpen} =  useReportMenu()
    const handleExport = () => {
        
        setIsMenuOpen(false); // Cerrar menu luego de exportar
    };

    return (
        <button
            onClick={handleExport}
            className="w-full bg-[#085494] text-white hover:bg-[#06457a] py-2 rounded-full transition-all font-bold"
        >
            Exportar
        </button>
    )
}