"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Button } from "app/app/components/utils/Input";
import { useFormFormulaTwo } from "app/app/components/hooks/validations/useFormFormulaTwo";
import { useStep } from "../../context/StepContext";
import { IconError } from "../../utils/IconError";
import { useIndicatorsValidContext } from "../../context/useIndicatorsValidContext";
import { useIndicatorsValid } from "../../hooks/indicator/useIndicatorsValid";
import { useTour } from "@reactour/tour";

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

const TABS = ["Variables", "Funciones", "Operadores", "Números"];

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
  const [activeTab, setActiveTab] = useState("Variables");

  const { setIsOpen } = useTour();

  useEffect(() => {
    if (data) {
      setIndicatorsValid(data.data);
    }
  }, [data]);

  useEffect(() => {
    // Abre el tour al montar (puedes condicionar a un `firstVisit`)
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
      setFieldTouched("formula", true, true);
      validateField("formula");
    }
  };

  const functions = [
    { name: "SUM()", value: "SUM()", hint: "Suma todos los valores de un conjunto" },
    { name: "COUNT()", value: "COUNT()", hint: "Cuenta cuántos elementos hay" },
    { name: "AVG()", value: "AVG()", hint: "Calcula el promedio de los valores" },
  ];

  const operators = [
    { name: "+", value: "+", hint: "Suma" },
    { name: "-", value: "-", hint: "Resta" },
    { name: "^", value: "^", hint: "Potencia" },
    { name: "/", value: "\\frac", hint: "Fracción" },
    { name: "*", value: "\\cdot", hint: "Multiplicación" },
  ];

  const numbers = Array.from({ length: 10 }, (_, i) => i).reverse();

  const renderTabContent = () => {
    switch (activeTab) {
      case "Variables":
        return indicatorsValid.map((ind) => (
          <button
            key={ind.id}
            title={ind.description}
            onClick={() => insertElement(ind.indicator)}
            className={`insert-button px-3 py-2 ${COLORS[3]} text-white rounded-md hover:bg-gray-800 transition`}
          >
            {ind.indicator}
          </button>
        ));
      case "Funciones":
        return functions.map((fn) => (
          <button
            key={fn.name}
            title={fn.hint}
            onClick={() => insertElement(fn.value)}
            className={`insert-button px-3 py-2 ${COLORS[3]} text-white rounded-md hover:bg-gray-800 transition`}
          >
            {fn.name}
          </button>
        ));
      case "Operadores":
        return operators.map((op) => (
          <button
            key={op.name}
            title={op.hint}
            onClick={() => insertElement(op.value)}
            className={`insert-button px-3 py-2 ${COLORS[3]} text-white rounded-md hover:bg-gray-800 transition`}
          >
            {op.name}
          </button>
        ));
      case "Números":
        return numbers.map((num) => (
          <button
            key={num}
            title={`Insertar ${num}`}
            onClick={() => insertElement(num.toString())}
            className={`insert-button px-3 py-2 ${COLORS[3]} text-white rounded-md hover:bg-gray-800 transition`}
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
            key={tab}
            className={`text-sm font-medium px-4 py-2 border-b-2 ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
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
            className="w-full min-h-[60px] text-lg"
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
