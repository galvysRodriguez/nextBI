"use client";

import dynamic from "next/dynamic";
import { useSectionOpen } from "app/app/components/context/IsGrid";
import { useState, useRef, useEffect } from "react";
import { Button, Input, Select } from "app/app/components/utils/Input";
import { useStep } from "../../context/StepContext";
import { useFormFormulaTwo } from "app/app/components/hooks/validations/useFormFormulaTwo";
import { IconError } from "../../utils/IconError";

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

  const funciones = [
    { nombre: "Suma", valor: "SUM" },
    { nombre: "Contar", valor: "COUNT" },
    { nombre: "Promedio", valor: "AVG" },
    { nombre: "Máximo", valor: "MAX" },
    { nombre: "Mínimo", valor: "MIN" },
  ];

  const operadores = ["+", "-", "*", "/"];

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

  return (
    <>
      <h2 className="text-xl text-center font-semibold mb-4">
        Editor de formula
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
            onClick={() => toggleSection("Funciones")}
          >
            Funciones {sectionOpen["Funciones"] ? "▲" : "▼"}
          </h4>
          {sectionOpen["Funciones"] && (
            <div className="flex flex-wrap gap-2 p-2">
              {funciones.map((funcion) => (
                <button
                  key={funcion.nombre}
                  type="button"
                  onClick={() => addElement(mathFieldRef, `${funcion.valor}(`)}
                  className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  {funcion.nombre}()
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <h4
            className="text-md font-semibold mb-2 cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSection("Operadores")}
          >
            Operadores {sectionOpen["Operadores"] ? "▲" : "▼"}
          </h4>
          {sectionOpen["Operadores"] && (
            <div className="flex flex-wrap gap-2 p-2">
              {operadores.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => addElement(mathFieldRef, ` ${op} `)}
                  className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  {op}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4">
          <h4
            className="text-md font-semibold mb-2 cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSection("Números")}
          >
            Números {sectionOpen["Números"] ? "▲" : "▼"}
          </h4>
          {sectionOpen["Números"] && (
            <div className="grid grid-cols-3 gap-2 p-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => addElement(mathFieldRef, num.toString())}
                  className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="mt-8 flex flex-col">
          <Button
            type="button"
            variant="primary"
            onClick={handleNext}
          >
            Siguiente
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