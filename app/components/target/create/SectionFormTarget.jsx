"use client";
import { useState } from "react";

export default function StepForm() {
  const [step, setStep] = useState(1);
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    objetivo: "",
    indicador: "",
    agregacion: "",
    fechaInicio: today,
    fechaFin: "",
    valores: [
      { categoria: "Óptimo", valor: "", porcentaje: "" },
      { categoria: "Tolerable", valor: "", porcentaje: "" },
      { categoria: "Deficiente", valor: "", porcentaje: "" },
    ],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValueChange = (index, field, value) => {
    const newValores = [...formData.valores];
    newValores[index][field] = value;
    setFormData({ ...formData, valores: newValores });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulario enviado con éxito 🎉");
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-center text-[#1e377c] pt-4 mt-8 mb-6">Formulario de objetivos</h1>
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
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                placeholder="Título del objetivo"
                className="w-full p-2 border rounded-lg mb-4"
                required
              />

              <label className="block mb-2">Indicadores</label>
              <select
                name="indicador"
                value={formData.indicador}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-4"
                required
              >
                <option value="">Seleccionar Indicador</option>
                <option value="ventas">Ventas</option>
                <option value="clientes">Clientes</option>
                <option value="productividad">Productividad</option>
              </select>

              <label className="block mb-2">Agregación</label>
              <select
                name="agregacion"
                value={formData.agregacion}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-4"
                required
              >
                <option value="">Seleccionar Agregación</option>
                <option value="total">Total</option>
                <option value="promedio">Promedio</option>
                <option value="cantidad">Cantidad</option>
              </select>
              <div className="flex justify-end">
                <button onClick={nextStep} className="bg-[#085494] text-white px-4 py-2 rounded-lg">
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
                name="fechaInicio"
                value={formData.fechaInicio}
                disabled
                className="w-full p-2 border rounded-lg mb-4 bg-gray-200"
              />

              <label className="block mb-2">Fecha Fin</label>
              <input
                type="date"
                name="fechaFin"
                value={formData.fechaFin}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mb-4"
                required
              />

              <div className="flex justify-between pt-16">
                <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
                  Anterior
                </button>
                <button onClick={nextStep} className="bg-[#085494] text-white px-4 py-2 rounded-lg">
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl text-center font-semibold mb-4">Asignación de Valores</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-gray-600 border p-2">Categoría</th>
                    <th className="text-gray-600 border p-2">Valor</th>
                    <th className="text-gray-600 border p-2">%</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.valores.map((row, index) => (
                    <tr key={index} className="text-center">
                      <td className="text-gray-600 border p-2 font-semibold">{row.categoria}</td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={row.valor}
                          onChange={(e) => handleValueChange(index, "valor", e.target.value)}
                          className="w-full p-1 border rounded"
                          required
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={row.porcentaje}
                          onChange={(e) => handleValueChange(index, "porcentaje", e.target.value)}
                          className="w-full p-1 border rounded"
                          required
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between  mt-4 pb-2 pt-12">
                <button onClick={prevStep} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
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
