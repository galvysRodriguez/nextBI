"use client";
import { useEffect } from "react";
import CustomBackButton from "app/app/components/target/detail/BackButton";
import { useStep } from "../../context/StepContext";


export default function StepForm({ initialStep, children, stepList, title }) {
  const { activeStep, setStep, setSteps } = useStep();

  useEffect(() => {
    setStep(initialStep);
    setSteps(stepList);
  }, [initialStep, stepList]);

  return (
    <>
     <div className="flex w-[80vw] mx-auto mt-4">
        <HeaderForm title={title}/>
      </div>

      <div className="max-w-xl mx-auto mt-4 p-6 mb-6 bg-white shadow-xl rounded-2xl overflow-y-auto">
        <div className="flex mb-6 border-b border-gray-200">
          {stepList.map((stepName, index) => (
            <div
              key={index}
              className={`
                flex items-center px-4 py-2 text-sm font-medium 
                transition-all whitespace-nowrap 
                ${
                  activeStep === index
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-400 border-b-2 border-transparent"
                }
              `}
            >
              <div
                className={`mr-2 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs
                ${
                  activeStep === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              {stepName}
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