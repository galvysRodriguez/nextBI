
import { ChevronDown, ChevronRight, Calendar } from "lucide-react";

export function ShowFilters({setShowDateFilters, showDateFilters}){
    return (
        <div className="flex flex-col items-end justify-end pb-2">
            <button
            onClick={() => setShowDateFilters(!showDateFilters)}
            className={`w-12 h-12 flex items-center justify-center 
                        bg-gray-200 text-gray-600 
                        hover:bg-gray-300 hover:text-gray-600  
                        font-bold rounded-full transition-all shadow-lg`}
            >
            {showDateFilters ? (
                <ChevronDown className="w-6 h-6" />
            ) : (
                <ChevronRight className="w-6 h-6" />
            )}
            </button>
        </div>
        
    )
}