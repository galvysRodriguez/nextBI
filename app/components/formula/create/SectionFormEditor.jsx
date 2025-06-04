"use client";

import dynamic from "next/dynamic";
import { useSectionOpen } from "app/app/components/context/IsGrid";
import { useState, useRef, useEffect } from "react";
import { Button, Input, Select } from "app/app/components/utils/Input";
import { useStep } from "../../context/StepContext";
import { useFormFormulaTwo } from "app/app/components/hooks/validations/useFormFormulaTwo";
import { IconError } from "../../utils/IconError";
import { useIndicatorsValidContext } from "../../context/useIndicatorsValidContext";
import { useIndicatorsValid } from "../../hooks/indicator/useIndicatorsValid";

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

export function SectionFormEditor() {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleNext,
    validateField,
    isSubmitting
  } = useFormFormulaTwo();

  const { sectionOpen, toggleSection } = useSectionOpen();
  const mathFieldRef = useRef(null);
  const { prevStep } = useStep();
  const{data} = useIndicatorsValid(values.tag_id)
  const{setIndicatorsValid, indicatorsValid} = useIndicatorsValidContext()
  
    useEffect(() => {
    if (data) {
      setIndicatorsValid(data.data);
    }
  }, [data]);

  const functions = [
    { name: "Suma", value: "SUM" },
    { name: "Contar", value: "COUNT" },
    { name: "Promedio", value: "AVG" },
  ];

  const operators = [
    { name: "+", value: "+" },
    { name: "-", value: "-" },
    { name: "^", value: "^" },
    { name: "/", value: "\\frac" },
    { name: "*", value: "\\cdot" },
  ];

  const handleFormulaChange = (mathField) => {
    console.log(mathField.latex());
    setFieldValue("formula", mathField.latex());
    setFieldTouched("formula", true, false);
    validateField("formula");
  };

  const addElement = (ref, element) => {
    if (ref.current) {
      ref.current.cmd(element);
      setFieldTouched("formula", true, true);
      validateField("formula");
    }
  };

  const addOperator = (ref, element) => {
    if (ref.current) {
      ref.current.cmd(element);
      setFieldTouched("formula", true, true);
      validateField("formula");
    }
  };

  return (
    <>
      <h2 className="text-xl text-center font-semibold mb-4">
        Editor de fórmula
      </h2>
      <div className="w-[80%] m-auto flex flex-col justify-center">
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
          <div className="text-red-500 text-sm flex items-start mt-[2px]">
              <IconError></IconError>
              {errors.formula}
          </div>
        )}

         <div className="mt-4">
          <h4
            className="text-md font-semibold mb-2 cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSection("Variables")}
          >
          Variables {sectionOpen["Variables"] ? "▲" : "▼"}
          </h4>
          {sectionOpen["Variables"] && (
            <div className="flex flex-wrap gap-2 p-2">
              {indicatorsValid.map((indicator) => (
                <button
                  key={indicator.id}
                  type="button"
                  title={indicator.description}
                  onClick={() => addElement(mathFieldRef, `${indicator.indicator}`)}
                  className={`px-3 py-2 ${COLORS[3]} text-white rounded-md hover:bg-gray-800`}
                >
                  {indicator.indicator}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <h4
            className="text-md font-semibold mb-2 cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSection("functions")}
          >
            Funciones {sectionOpen["functions"] ? "▲" : "▼"}
          </h4>
          {sectionOpen["functions"] && (
            <div className="flex flex-wrap gap-2 p-2">
              {functions.map((funcion) => (
                <button
                  key={funcion.nombre}
                  type="button"
                  onClick={() => addElement(mathFieldRef, `${funcion.value}()`)}
                  className={`px-3 py-2 ${COLORS[2]} text-white rounded-md hover:bg-gray-800`}
                >
                  {funcion.name}()
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <h4
            className="text-md font-semibold mb-2 cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSection("operators")}
          >
            Operadores {sectionOpen["operators"] ? "▲" : "▼"}
          </h4>
          {sectionOpen["operators"] && (
            <div className="flex flex-wrap gap-2 p-2">
              {operators.map((op) => (
                <button
                  key={op.name}
                  type="button"
                  onClick={() => addOperator(mathFieldRef, op.value)}
                  className={`px-3 py-2 ${COLORS[1]} text-white rounded-md hover:bg-gray-800`}
                >
                  {op.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <h4
            className="text-md font-semibold mb-2 cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSection("numbers")}
          >
            Números {sectionOpen["numbers"] ? "▲" : "▼"}
          </h4>
          {sectionOpen["numbers"] && (
            <div className="grid grid-cols-3 gap-2 p-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => addElement(mathFieldRef, num.toString())}
                  className={`px-3 py-2 ${COLORS[0]} text-white rounded-md hover:bg-gray-800`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-col">
          <Button
            type="submit"
            variant="primary"
            onClick={handleNext}
          >
            Enviar
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
    </>
  );
}