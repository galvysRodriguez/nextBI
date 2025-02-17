"use client";
import { useState } from "react";
import { useSaveForm } from "../../hooks/useSaveForm";
import { OptionAggregation } from "./OptionAggregation";
import { OptionIndicator } from "./OptionIndicator";

export default function StepForm({perspective_id = 1}) {
  const [step, setStep] = useState(1);
  const today = new Date().toISOString().split("T")[0];
  const { mutate, isLoading, isError, error, isSuccess } = useSaveForm();

  const [formData, setFormData] = useState({
    title: "",
    perspective_id: perspective_id,
    formula_id: "",
    start_date: today,
    end_date: "",
    optimal: "",
    tolerable: "",
    deficient: "",
    optimal_percentage: "",
    tolerable_percentage: "",
    deficient_percentage: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
    alert("Formulario enviado con éxito 🎉");
    console.log(formData);
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-[#1e377c] pt-4 mt-8 mb-6">
        Formulario de objetivos
      </h1>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl h-[460px] overflow-y-auto">
        <div className="flex items-center justify-between mb-6 relative">
          {[1, 2, 3].map((s, index) => (
            <div key={index} className="relative flex items-center">
              {index > 0 && (
                <div className="absolute w-full h-1 bg-gray-300 top-1/2 -translate-y-1/2 left-0 right-0 z-0"></div>
              )}
              <div
                className={`relative z-10 w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                  step === index + 1 ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                {s}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h2 className="text-xl text-center font-semibold mb-4">Definir Objetivo</h2>
              <label className="block mb-2">Título</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título del objetivo"
                className="w-full p-2 border rounded-lg mb-4"
                required
              />

              <label className="block mb-2">Formulas</label>
              <select
                name="formula_id"
                value={formData.formula_id}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-4"
                required
              >
                <OptionIndicator></OptionIndicator>
              </select>

              <div className="flex justify-end">
                <button type="button" onClick={nextStep} className="bg-[#085494] text-white px-4 py-2 rounded-lg">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl text-center font-semibold mb-4">Seleccionar Fechas</h2>
              <label className="block mb-2">Fecha de Inicio (Automática)</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                disabled
                className="w-full p-2 border rounded-lg mb-4 bg-gray-200"
              />

              <label className="block mb-2">Fecha Fin</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-4"
                required
              />

              <div className="flex justify-between pt-16">
                <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                  Anterior
                </button>
                <button type="button" onClick={nextStep} className="bg-[#085494] text-white px-4 py-2 rounded-lg">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl text-center font-semibold mb-4">Asignación de Valores</h2>
              <table className="w-full border-collapse border border-gray-300">
                <tbody>
                  {["optimal", "tolerable", "deficient"].map((type, index) => (
                    <tr key={index} className="text-center">
                      <td className="text-gray-600 border p-2 font-semibold">{type.charAt(0).toUpperCase() + type.slice(1)}</td>
                      <td className="border p-2">
                        <input
                          type="number"
                          name={type}
                          value={formData[type]}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                          required
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          name={`${type}_percentage`}
                          value={formData[`${type}_percentage`]}
                          onChange={handleChange}
                          className="w-full p-1 border rounded"
                          required
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between mt-4 pb-2 pt-12">
                <button type="button" onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                  Anterior
                </button>
                <button type="submit" className="bg-[#085494] text-white px-4 py-2 rounded-lg">
                  Enviar
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
