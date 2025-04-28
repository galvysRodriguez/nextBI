
export const selectedStyle = "bg-gray-500 text-white px-3 py-1 rounded-full";
export const normalStyle = "bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-300";
export function ContainerMenu({children}){
    return(
        <div className="absolute mt-16 w-72 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-4 z-50">
            {children}
        </div>
    )
}

export function SubtitleContainerMenu({children}){
    return (
        <div className="mb-2 font-semibold text-gray-700">{children}</div>
    )
}