
import { useDataForm, useSectionOpen } from "../context/IsGrid";
import { usePerspective } from "../hooks/usePerspective";

export function ProcessPerspective() {
  const { formData, handleChange, handleFormulaChange, addElement } = useDataForm();
  const { sectionOpen, toggleSection } = useSectionOpen();

  // Usar react-query para obtener los datos
  const { data, error, isLoading } = usePerspective();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // Extraer los datos de la respuesta
  const variablesPorPerspectiva = data?.data?.reduce((acc, perspectiva) => {
    acc[perspectiva.name] = perspectiva.indicators.map(indicator => indicator.name);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(variablesPorPerspectiva).map(([perspectiva, vars]) => (
        <div key={perspectiva} className="mt-4">
          <h4
            className="text-md font-semibold mb-2 cursor-pointer bg-gray-200 p-2 rounded-md"
            onClick={() => toggleSection(perspectiva)}
          >
            {perspectiva} {sectionOpen[perspectiva] ? "▲" : "▼"}
          </h4>
          {sectionOpen[perspectiva] && (
            <div className="flex flex-wrap gap-2 p-2">
              {vars.map((variable) => (
                <button
                  key={variable}
                  onClick={() => addElement(variable)}
                  className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {variable}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}