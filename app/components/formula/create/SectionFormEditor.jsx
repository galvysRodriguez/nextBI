"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "app/app/components/utils/Input";
import { useFormFormulaTwo } from "app/app/components/hooks/validations/useFormFormulaTwo";
import { useStep } from "../../context/StepContext";
import { IconError } from "../../utils/IconError";
import { useIndicatorsValidContext } from "../../context/useIndicatorsValidContext";
import { useIndicatorsValid } from "../../hooks/indicator/useIndicatorsValid";
import { useTour } from "@reactour/tour";
import { createOnboardingSteps } from "./OnborardingSteps";

const COLORS = [
  'bg-[#1E88E5]', 
  'bg-[#1E88E5]',
  'bg-[#1E88E5]',
  'bg-[#1E88E5]',
];
const EditableMathField = dynamic(
  () =>
    import("react-mathquill").then((mod) => {
      mod.addStyles();
      return mod.EditableMathField;
    }),
  { ssr: false }
);

const TABS = [
  {name: "funciones", text: "Funciones"}, 
  {name: "variables", text: "Variables"}, 
  {name: "operadores", text: "Operadores"}, 
  {name:"numeros", text:"Números"}];

function FormulaEditorTour({ children, indicatorsValid, handleChangeTab, insertElement }) {
  const [steps, setSteps] = useState([]);
  const { setIsOpen } = useTour();

  useEffect(() => {
    if (indicatorsValid?.length > 0) {
      const newSteps = createOnboardingSteps(handleChangeTab, insertElement, indicatorsValid);
      setSteps(newSteps);
    }
  }, [indicatorsValid, handleChangeTab, insertElement]);

  useEffect(() => {
    const seenTour = localStorage.getItem("hasSeenTourFormulaEditor");
    if (!seenTour && steps.length > 0) {
      setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("hasSeenTourFormulaEditor", "true");
      }, 500);
    }
  }, [steps, setIsOpen]);

  return children;
}

export function SectionFormEditor() {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleNext,
    validateField,
    isSubmitting,
  } = useFormFormulaTwo();

  const { prevStep } = useStep();
  const mathFieldRef = useRef(null);
  const { data } = useIndicatorsValid(values.tag_id);
  const { setIndicatorsValid, indicatorsValid } = useIndicatorsValidContext();
  const [activeTab, setActiveTab] = useState("funciones");

  const { setIsOpen, setSteps } = useTour();

  const handleChangeTab = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  
  useEffect(() => {
    if (data) {
      setIndicatorsValid(data.data);
    }
  }, [data]);

  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleFormulaChange = (mathField) => {
    setFieldValue("formula", mathField.latex());
    setFieldTouched("formula", true, false);
    validateField("formula");
  };


  const insertElement = (element) => {
    if (mathFieldRef.current) {
      mathFieldRef.current.cmd(element);
      setFieldTouched("formula", true, false);
      validateField("formula");
    }
  };

  useEffect(() => {
  if (data?.data?.length > 0) {
    const steps = createOnboardingSteps(handleChangeTab, insertElement, data?.data);
    setSteps(steps);
  }
}, [data]);


  const functions = [
    { name: "SUM", value: "SUM", hint: "Suma todos los valores de un conjunto" },
    { name: "COUNT", value: "COUNT", hint: "Cuenta cuántos elementos hay" },
    { name: "AVG", value: "AVG", hint: "Calcula el promedio de los valores" },
  ];

  const operators = [
    { name: "+", value: "+", hint: "Suma" },
    { name: "-", value: "-", hint: "Resta" },
    { name: "^", value: "^", hint: "Potencia" },
    { name: "/", value: "\\frac", hint: "Fracción" },
    { name: "*", value: "\\cdot", hint: "Multiplicación" },
  ];

  const numbers = Array.from({ length: 10 }, (_, i) => i);

  const renderTabContent = () => {
    switch (activeTab) {
      case "funciones":
        return functions.map((fn) => (
          <button
            key={fn.name}
            title={fn.hint}
            onClick={() => insertElement(fn.value)}
            className={`insert-button ribbon-tab-funciones px-3 py-2 ${COLORS[3]} text-white rounded-md hover:bg-gray-800 transition`}
          >
            {fn.name}
          </button>
        ));
      case "variables":
        return indicatorsValid.map((ind) => (
          <button
            key={ind.id}
            title={ind.description}
            onClick={() => insertElement(ind.indicator)}
            className={`insert-button ribbon-tab-variables px-3 py-2 ${COLORS[3]} text-white rounded-md hover:bg-gray-800 transition`}
          >
            {ind.indicator}
          </button>
        ));
      case "operadores":
        return operators.map((op) => (
          <button
            key={op.name}
            title={op.hint}
            onClick={() => insertElement(op.value)}
            className={`insert-button ribbon-tab-operadores px-3 py-2 ${COLORS[3]} text-white rounded-md hover:bg-gray-800 transition`}
          >
            {op.name}
          </button>
        ));
      case "numeros":
        return numbers.map((num) => (
          <button
            key={num}
            title={`Insertar ${num}`}
            onClick={() => insertElement(num.toString())}
            className={`insert-button ribbon-tab-numeros px-3 py-2 ${COLORS[3]} text-white rounded-md hover:bg-gray-800 transition`}
          >
            {num}
          </button>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="w-[80%] m-auto flex flex-col gap-4">
      <div className="ribbon-tab flex space-x-4 border-b pb-2">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab.name}
            className={`ribbon-tab-${tab.name.toLowerCase()} text-sm font-medium px-4 py-2 border-b-2 ${
              activeTab === tab.name
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => handleChangeTab(tab.name)}
          >
            {tab.text}
          </button>
        ))}
      </div>
      <div>
         <div className={`bg-gray-100 border rounded-md p-2 h-20 ${
          touched.formula && errors.formula ? 'border-red-500' : 'border-gray-300'
        }`}>
          <EditableMathField
            latex={values.formula}
            onChange={handleFormulaChange}
            className="math-field w-full min-h-[60px] text-lg"
            mathquillDidMount={(mathField) => (mathFieldRef.current = mathField)}
          />
        </div>
        {touched.formula && errors.formula && (
          <div className="text-red-500 text-sm flex items-start">
              <IconError></IconError>
              {errors.formula}
          </div>
        )}
      </div>
    

      <div className="flex flex-wrap gap-2">{renderTabContent()}</div>

      <div className="mt-8 flex flex-col">
          <Button
            type="submit"
            variant="primary"
            onClick={handleNext}
            isDisabled={isSubmitting}
          >
            Guardar
          </Button>
          <Button
            type="button"
            onClick={prevStep}
            variant="secondary"
            isDisabled={isSubmitting}
          >
            Volver
          </Button>
        </div>
    </div>
  );
}
