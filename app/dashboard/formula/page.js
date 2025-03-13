"use client";

import { useDataForm, useSectionOpen } from "app/app/components/context/IsGrid";
import { ProcessPerspective } from "app/app/components/formula/ProcessPerspective";
import { useSaveFormula } from "app/app/components/hooks/useFormula";
import { ButtonCreate } from "app/app/components/target/ButtonCreate";
import { useState, useRef, useEffect } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

addStyles();

export default function FormulaEditor() {
  const { formData, handleChange, handleFormulaChange, handleKeyDown, errorText, setErrorText,
    validate
   } = useDataForm();
  const { sectionOpen, toggleSection } = useSectionOpen();
  const { mutate, isLoading, isError, error, isSuccess } = useSaveFormula();
  const mathFieldRef = useRef(null);

  const funciones = [
    { nombre: "Suma", valor: "SUM" },
    { nombre: "Contar", valor: "COUNT" },
    { nombre: "Promedio", valor: "AVG" },
    { nombre: "Máximo", valor: "MAX" },
    { nombre: "Mínimo", valor: "MIN" },
  ];

  const operadores = ["+", "-", "*", "/"];

  
  const saveFormula = (e) => {
    e.preventDefault();
    if(validate()){
      alert(`Fórmula creada con éxito: ${formData.formula} y ${formData.title}`);
      mutate(formData);
    }
  }

  useEffect(() => {
    validate()
  }, [formData.formula, validate]); 

  // Inserta elementos en la posición actual del cursor
  const addElement = (element) => {
    if (mathFieldRef.current) {
      mathFieldRef.current.cmd(element);
    }
  };
  console.log({formula: formData.formula});
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-4 shadow-lg">
        <h3 className="text-xl font-semibold text-center mb-4">
          Editor de Fórmulas
        </h3>

        <form onSubmit={saveFormula}>
          <label className="block mb-2">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Título de la fórmula"
            className="w-full p-2 border rounded-lg mb-4"
            required
          />
        
        <div className="bg-gray-100 border-red-500 rounded-md p-2 w-full h-20">
          <EditableMathField
            latex={formData.formula}
            onChange={handleFormulaChange}
            className="w-full min-h-[60px] text-lg"
            mathquillDidMount={(mathField) => (mathFieldRef.current = mathField)}
          />
        </div>
        </form>

        {errorText && <p className="text-red-500 mt-2">{errorText}</p>}

        <ProcessPerspective />

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
                  onClick={() => addElement(`${funcion.valor}(`)}
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
                  onClick={() => addElement(` ${op} `)}
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
                  onClick={() => addElement(num.toString())}
                  className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          onClick={saveFormula}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Crear Fórmula
        </button>
      </div>
    </div>
  );
}
