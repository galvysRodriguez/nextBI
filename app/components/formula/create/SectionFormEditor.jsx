"use client";

import dynamic from "next/dynamic";
import { useSectionOpen } from "app/app/components/context/IsGrid";
import { ProcessPerspective } from "app/app/components/formula/ProcessPerspective";
import { useSaveFormula } from "app/app/components/hooks/useFormula";
import { ButtonCreate } from "app/app/components/target/ButtonCreate";
import { useState, useRef, useEffect } from "react";
import { useDataForm } from "app/app/components/context/useDataForm";
import { Button, Input, Select } from "app/app/components/utils/Input";
import { useStep } from "../../context/StepContext";

const EditableMathField = dynamic(
    () =>
      import("react-mathquill").then((mod) => {
        mod.addStyles();
        return mod.EditableMathField;
      }),
    { ssr: false }
  );

export function SectionFormEditor(){
    const { formData, handleFormulaChange, errorText, validate, addElement } =
        useDataForm();
      const { sectionOpen, toggleSection } = useSectionOpen();
      const mathFieldRef = useRef(null)
      const {prevStep} = useStep()
      const funciones = [
        { nombre: "Suma", valor: "SUM" },
        { nombre: "Contar", valor: "COUNT" },
        { nombre: "Promedio", valor: "AVG" },
        { nombre: "Máximo", valor: "MAX" },
        { nombre: "Mínimo", valor: "MIN" },
      ];
    
      const operadores = ["+", "-", "*", "/"];
    
    
      useEffect(() => {
        validate();
      }, [formData.formula, validate]);
    return (
    
    <>
        <h2 className="text-xl text-center font-semibold mb-4">
            Editor de formula
        </h2>
        <div className="w-[80%] m-auto flex flex-col justify-center">
            <div className="bg-gray-100 border-red-500 rounded-md p-2 h-20">
                    <EditableMathField
                      latex={formData.formula}
                      onChange={handleFormulaChange}
                      className="w-full min-h-[60px] text-lg"
                      mathquillDidMount={(mathField) =>
                        (mathFieldRef.current = mathField)
                      }
                    />
                  </div>
                {errorText && <p className="text-red-500 mt-2">{errorText}</p>}
        
                
        
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
                          onClick={() => addElement(mathFieldRef,`${funcion.valor}(`)}
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
                      type="submit"
                      variant="primary"
                    >
                      Siguiente
                    </Button>
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="secondary"
                    >
                      Volver
                    </Button>
                </div>
        </div>
       
    
    </>
    )  
}