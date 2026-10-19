export const createOnboardingSteps = (setActiveTab, insertElement, indicatorsValid) => {
  return [
    {
      selector: ".ribbon-tab",
      content: (
        <div className="text-[#333]">
          <b>Bienvenido al editor de fórmulas.</b> <br />
          Usa estas pestañas para cambiar entre <i>Variables</i>, <i>Funciones</i>, <i>Operadores</i> y <i>Números</i>.
        </div>
      ),
    },
    {
      selector: ".ribbon-tab-funciones",
      content: "Haz clic aquí para ver las funciones disponibles.",
      action: () => setActiveTab("funciones"),
    },
    {
      selector: ".insert-button",
      content: "Insertamos la función SUM automáticamente.",
      action: () => insertElement("SUM"),
    },
    {
      selector: ".math-field",
      content: "Abrimos paréntesis para agregar argumentos a la función.",
      action: () => {
        insertElement("(");
      },
    },
    {
      selector: ".ribbon-tab-variables",
      content: "Cambiamos a la pestaña Variables.",
      action: () => setActiveTab("variables"),
    },
    {
      selector: ".insert-button",
      content: `Insertamos la primera variable disponible: ${indicatorsValid?.[0]?.indicator || "variable"}.`,
      action: () => {
        if (indicatorsValid?.length > 0) {
          insertElement(indicatorsValid[0].indicator);
          insertElement(")");
        }
      },
    },
    {
      selector: ".ribbon-tab-operadores",
      content: "Ahora puedes agregar operadores como +, -, /, *, ^ para armar fórmulas más complejas.",
      action: () => setActiveTab("operadores"),
    },
    {
      selector: ".ribbon-tab-numeros",
      content: "También puedes insertar números directamente desde aquí si lo necesitas.",
      action: () => setActiveTab("numeros"),
    },
    {
      selector: ".math-field",
      content: "¡Listo! Hemos armado la fórmula. Puedes seguir editando si lo deseas.",
    },
  ];
};
