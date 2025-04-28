

export function ButtonBase({children, onClick, isLoading=false}){
    return (
        <button
            className={`w-12 h-12 flex items-center justify-center
                bg-gray-300 text-gray-600 font-bold rounded-full
                hover:bg-gray-400 hover:text-white active:bg-gray-500 transition-all shadow-lg`}
            disabled={isLoading}
            onClick={onClick}
            >
            {children}
        </button>
    )
}