"use client";

import { useSaveFormula } from "app/app/components/hooks/useFormula";
import { ButtonCreate } from "app/app/components/target/ButtonCreate";
import { useState } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

addStyles();

export default function FormulaEditor() {
  const [formData, setFormData] = useState({
    title: "",
    formula: "",
  });
  const [errorText, setErrorText] = useState("");
  const [seccionesAbiertas, setSeccionesAbiertas] = useState({});
  const { mutate, isLoading, isError, error, isSuccess } = useSaveFormula();

  // Funciones disponibles en inglés
  const funciones = [
    { nombre: "Suma", valor: "SUM" },
    { nombre: "Contar", valor: "COUNT" },
    { nombre: "Promedio", valor: "AVERAGE" },
    { nombre: "Máximo", valor: "MAX" },
    { nombre: "Mínimo", valor: "MIN" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormulaChange = (mathField) => {
    setFormData({ ...formData, formula: mathField.latex() });
  };

  // Variables agrupadas por perspectiva
  const variablesPorPerspectiva = {
    "Procesos Internos": ["Eficiencia", "Tiempo de producción"],
    Innovación: ["Nuevos productos", "Investigación y desarrollo"],
    Finanzas: ["Ingresos", "Costos", "Utilidad"],
    Clientes: ["Satisfacción", "Retención", "Quejas"],
  };

  // Operadores permitidos
  const operadores = ["+", "-", "*", "/"];

  // Función para alternar la visibilidad de una sección
  const toggleSeccion = (seccion) => {
    setSeccionesAbiertas((prev) => ({
      ...prev,
      [seccion]: !prev[seccion],
    }));
  };

  // Agregar elementos a la fórmula
  const agregarElemento = (elemento) => {
    setFormData((prev) => ({
      ...prev,
      formula: prev.formula + elemento,
    }));
  };

  // Validar la fórmula
  const validarFormula = (e) => {
    try {
      e.preventDefault();
      if (!formData.formula.trim()) {
        throw new Error("La fórmula está vacía.");
      }

      const abrirParentesis = (formData.formula.match(/\(/g) || []).length;
      const cerrarParentesis = (formData.formula.match(/\)/g) || []).length;
      if (abrirParentesis !== cerrarParentesis) {
        throw new Error("Los paréntesis no están balanceados.");
      }

      if (/[\+\-\*\/]$/.test(formData.formula)) {
        throw new Error("No puede haber operadores al final de la fórmula.");
      }

      
      alert(`Fórmula creada con éxito: ${formData.formula} y ${formData.title}`);
      mutate(formData);
      alert('enviado')
      setErrorText("");
    } catch (err) {
      setErrorText(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md p-4 shadow-lg">
        <h3 className="text-xl font-semibold text-center mb-4">
          Editor de Fórmulas
        </h3>

        {/* Editor visual */}
        <form onSubmit={validarFormula}>
          <label className="block mb-2">Titulo</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Título de la formula"
                  className="w-full p-2 border rounded-lg mb-4"
                  required
            />
          
          <div className="border rounded-md p-2 bg-gray-100">
            <EditableMathField
              latex={formData.formula}
              onChange={handleFormulaChange}
              className="w-full min-h-[60px] text-lg"
            />
          </div>
        </form>
        

        {errorText && <p className="text-red-500 mt-2">{errorText}</p>}

        {/* Secciones con acordeón */}
        {Object.entries(variablesPorPerspectiva).map(([perspectiva, vars]) => (
          <div key={perspectiva} className="mt-4">
            <h4
              className="text-md font-semibold mb-2 cursor-pointer bg-gray-200 p-2 rounded-md"
              onClick={() => toggleSeccion(perspectiva)}
            >
              {perspectiva} {seccionesAbiertas[perspectiva] ? "▲" : "▼"}
            </h4>
            {seccionesAbiertas[perspectiva] && (
              <div className="flex flex-wrap gap-2 p-2">
                {vars.map((variable) => (
                  <button
                    key={variable}
                    onClick={() => agregarElemento(variable)}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {variable}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="mt-4">
          <h4
            className="text-md font-semibold mb-2 cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSeccion("Funciones")}
          >
            Funciones {seccionesAbiertas["Funciones"] ? "▲" : "▼"}
          </h4>
          {seccionesAbiertas["Funciones"] && (
            <div className="flex flex-wrap gap-2 p-2">
              {funciones.map((funcion) => (
                <button
                  key={funcion.nombre}
                  onClick={() => agregarElemento(`${funcion.valor}(`)}
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
            onClick={() => toggleSeccion("Operadores")}
          >
            Operadores {seccionesAbiertas["Operadores"] ? "▲" : "▼"}
          </h4>
          {seccionesAbiertas["Operadores"] && (
            <div className="flex flex-wrap gap-2 p-2">
              {operadores.map((op) => (
                <button
                  key={op}
                  onClick={() => agregarElemento(` ${op} `)}
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
            onClick={() => toggleSeccion("Números")}
          >
            Números {seccionesAbiertas["Números"] ? "▲" : "▼"}
          </h4>
          {seccionesAbiertas["Números"] && (
            <div className="grid grid-cols-3 gap-2 p-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                <button
                  key={num}
                  onClick={() => agregarElemento(num.toString())}
                  className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={validarFormula}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Crear Fórmula
        </button>
      </div>
    </div>
  );
}
