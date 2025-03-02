

export function LoadingSkeletonTarget(){
    return (
        <div className="w-full max-w-[1200px] px-4 md:px-6 lg:px-8 grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-6 animate-pulse">
            <div className={'max-w-[500px] h-[400px] rounded-2xl p-6 cursor-pointer bg-white border border-gray-300'}>
            </div>    
            <div className={'max-w-[500px] h-[400px] rounded-2xl p-6 cursor-pointer bg-white border border-gray-300'}>
            </div>
            <div className={'max-w-[500px] h-[400px] rounded-2xl p-6 cursor-pointer bg-white border border-gray-300'}>
            </div>
            <div className={'max-w-[500px] h-[400px] rounded-2xl p-6 cursor-pointer bg-white border border-gray-300'}>
            </div>
            <div className={'max-w-[500px] h-[400px] rounded-2xl p-6 cursor-pointer bg-white border border-gray-300'}>
            </div>
            <div className={'max-w-[500px] h-[400px] rounded-2xl p-6 cursor-pointer bg-white border border-gray-300'}>
            </div>
        </div>
    )
}