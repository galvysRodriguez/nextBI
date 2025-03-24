"use client";
import { useEffect } from "react";
import CustomBackButton from "app/app/components/target/detail/BackButton";
import { useStep } from "../../context/StepContext";


export default function StepForm({ initialStep, children }) {
  const { activeStep, setStep} = useStep();

  useEffect(()=>{
    setStep(initialStep)
  }, [initialStep])
  return (
    <>
      <div className="flex w-[80vw] mx-auto mt-4">
        <HeaderForm/>
      </div>
      <div className="max-w-lg mx-auto mt-2 p-6 bg-white shadow-lg rounded-2xl h-[520px] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 relative">
          {[1, 2, 3].map((s, index) => (
            <div key={index} className="relative flex items-center">
              {index > 0 && (
                <div className="absolute w-full h-1 bg-gray-300 top-1/2 -translate-y-1/2 left-0 right-0 z-0"></div>
              )}
              <div
                className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                  activeStep === index ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {s}
              </div>
            </div>
          ))}
        </div>
          {children}
      </div>
    </>
  );
}

function HeaderForm({title = "Formulario de objetivos"}) {
  return (
    <div className="flex items-center justify-between w-[100%] md:w-[66%]">
      <CustomBackButton></CustomBackButton>
      <h1 className="text-3xl font-bold text-center text-[#1e377c] pt-4 mt-4 mb-6">
          {title}
      </h1>
    </div>
    )
  }