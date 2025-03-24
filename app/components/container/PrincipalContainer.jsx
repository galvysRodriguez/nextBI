

export function PrincipalContainer({children}) {
    return (
        <>
            <div className="w-full min-h-screen bg-gray-100 text-[#000] flex flex-col items-center pb-12">
                {children}
            </div>
        </>
    )
}