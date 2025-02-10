import { HeaderTarget } from "./HeaderTarget"
import { MainTarget } from "./MainTarget"

export function SectionTarget({content, title}) {
    return (
        <>
            <div className="w-full min-h-screen bg-gray-100 text-[#000] flex flex-col items-center pb-12">
                <h1 className="text-4xl font-bold text-center text-[#253664] pt-4 mt-8 mb-6 animate-fadeIn">
                    {title}
                </h1>
                <HeaderTarget></HeaderTarget>
                <MainTarget content={content}></MainTarget>
            </div>
        </>
    )
}
