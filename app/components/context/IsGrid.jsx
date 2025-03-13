import { create } from 'zustand'


export const useIsGrid = create((set) => ({
  grid: true,
  changeGrid: () => set((state) => ({ grid: !state.grid })),
}))

export const useIsExpanded = create((set) => ({
  expanded: false,
  changeExpanded: () => set((state) => ({ expanded: !state.expanded })),
}))

export const useIsMobile = create((set) => ({
  mobile: false,
  changeMobile: () => set((state) => ({ mobile: !state.mobile })),
}))

export const useSearchTarget = create((set) => ({
  search: "",
  changeSearch: (search) => set({ search }),
}))

export const useMenuMobile = create((set, get) => ({
  menuMobile: false,
  changeMenuMobile: () => {
    set((state) => ({ menuMobile: !state.menuMobile }));
    useIsExpanded.getState().changeExpanded();
  }
}));

export const useSectionOpen = create((set) =>({
  sectionOpen: {},
  toggleSection: (section) => {
    set((state) => ({
      sectionOpen: {
        ...state.sectionOpen, 
        [section]: !state.sectionOpen[section],
      },
    }));
  },
}))

export const useDataForm = create((set, get) => ({
  formData: {
    title: "",
    formula: "",
  },

  errorText: "",
  
  setErrorText: (text) => {
    set({ errorText: text })},
  
  handleChange: (e) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [e.target.name]: e.target.value,
      },
    }));

  },
  validate: () => {
    const { formData } = get()
    try {
      const formula = formData.formula.trim();
  
      // 1. Fórmula vacía
      if (!formula) {
        throw new Error("");
      }
  
      // 2. Paréntesis balanceados
      const abrirParentesis = (formula.match(/\(/g) || []).length;
      const cerrarParentesis = (formula.match(/\)/g) || []).length;
      if (abrirParentesis !== cerrarParentesis) {
        throw new Error("Los paréntesis no están balanceados.");
      }
  
      // 3. Llaves balanceadas
      const abrirLlaves = (formula.match(/\{/g) || []).length;
      const cerrarLlaves = (formula.match(/\}/g) || []).length;
      if (abrirLlaves !== cerrarLlaves) {
        throw new Error("Las llaves no están balanceadas.");
      }
  
      // 4. Corchetes balanceados
      const abrirCorchetes = (formula.match(/\[/g) || []).length;
      const cerrarCorchetes = (formula.match(/\]/g) || []).length;
      if (abrirCorchetes !== cerrarCorchetes) {
        throw new Error("Los corchetes no están balanceados.");
      }
  
      // 5. Operadores al final
      if (/(\+|-|\*|\/|\\cdot)$/.test(formula)) {
        throw new Error("No puede haber operadores al final de la fórmula.");
      }

      // 6. Operadores consecutivos
      if (/(\+|-|\*|\/|\\cdot){2,}/.test(formula.replace(/\\cdot/g, '*'))) {
        throw new Error("No puede haber operadores consecutivos.");
      }

  
      // 7. Fracciones válidas
      if (formula.includes("\\frac")) {
        const fraccionesValidas = formula.match(/\\frac\{[^}]+\}\{[^}]+\}/g);
        if (!fraccionesValidas || fraccionesValidas.length === 0) {
          throw new Error("Las fracciones no están correctamente formadas.");
        }
      }
  
      // 8. Raíces válidas
      if (formula.includes("\\sqrt")) {
        const raicesValidas = formula.match(/\\sqrt\{[^}]+\}/g);
        if (!raicesValidas || raicesValidas.length === 0) {
          throw new Error("Las raíces no están correctamente formadas.");
        }
      }
  
      // 9. Comandos LaTeX válidos
      const comandosValidos = ["\\sin", "\\cos", "\\tan", "\\log", "\\ln", "\\sqrt", "\\frac",
        "\\sum", "\\prod", "\\int", "\\oint", "\\lim", "\\infty", "\\pm", "\\mp", "\\times",
        "\\div", "\\cdot", "\\pm", "\\mp", "\\leq", "\\geq", "\\neq", "\\approx", "\\equiv",
        "\\left", "\\right", "\\{", "\\}", "\\(", "\\)", "\\[", "\\]", "\\{", "\\}"
      ];
      const comandosEnFormula = formula.match(/\\[a-zA-Z]+/g) || [];
      for (const comando of comandosEnFormula) {
        if (!comandosValidos.includes(comando)) {
          throw new Error(`Comando LaTeX no válido: ${comando}`);
        }
      }
  
      // 10. Caracteres no permitidos
      const caracteresNoPermitidos = ["#", "$", "%", "&", "_", "~", "^", 
        "sin", "cos", "tan", "log", "ln"];
      for (const caracter of caracteresNoPermitidos) {
        if (formula.includes(caracter)) {
          throw new Error(`Carácter no permitido: ${caracter}`);
        }
      }

      // 11. Exponentes no válidos
      if (formula.includes("^")) {
        const exponentesVacios = formula.match(/\^\{\}/g);
        if (exponentesVacios && exponentesVacios.length > 0) {
          throw new Error("No se permite un exponente vacío.");
        }
      }

      // 12. Fracciones válidas
    if (formula.includes("\\frac")) {
      const fraccionesValidas = formula.match(/\\frac\{[^}]+\}\{[^}]+\}/g);
      if (!fraccionesValidas || fraccionesValidas.length === 0) {
        throw new Error("Las fracciones no están correctamente formadas.");
      }

      // Verificar divisiones entre cero
      const divisionesEntreCero = formula.match(/\\frac\{[^}]+\}\{0\}/g);
      if (divisionesEntreCero && divisionesEntreCero.length > 0) {
        throw new Error("No se permite la división entre cero.");
      }
    }

    const options = [
      "nuevosClientes", "Ventas", "Compras", "Clientesfinales",
      "SUM", "COUNT", "AVG", "MAX", "MIN", "+", "-", ".", "/", "*", "\\cdot", "\\frac", "\cdot",
      "(", ")", "{", "}", "\sqrt"
    ];
    
    // 2. Eliminar \left, \right y espacios innecesarios
    const formulaSinLeftRight = formula.replace(/\\left|\\right|\\ /g, "");

    // 3. Dividir la fórmula en palabras, operadores y números
    const palabrasEnFormula = formulaSinLeftRight.split(/(\\cdot|\\frac|[+\-*/(){}])/).filter(Boolean);

    // 4. Verificar que todas las palabras estén en la lista de opciones permitidas o sean números
    for (const palabra of palabrasEnFormula) {
      if (!options.includes(palabra) && isNaN(palabra)) {
        throw new Error(`La fórmula contiene la palabra no permitida: ${palabra}`);
      }
    }

    // 5. Verificar que no haya caracteres no permitidos (excluyendo \left, \right y espacios)
    const caracteresPermitidos = new RegExp(
      `^[${options.map(option => option.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("")}\\s()+-.*\\/\\d{}]*$`
    );

    if (!caracteresPermitidos.test(formulaSinLeftRight)) {
      throw new Error("La fórmula contiene caracteres no permitidos.");
    }

      set({ errorText: "" })
      return true;
    } catch (err) {
      set({ errorText: err.message })
      return false;
    }
  },
  

  handleFormulaChange: (mathField) => {
    set((state) => ({
      formData: {
        ...state.formData,
        formula: mathField.latex(),
      },
    }));
  },
  
}));

export const useCardStore = create((set, get) => ({
  selectedCard: null, 

  handleSelect: (cardId) => {
    set((state) => {
      if (get().selectedCard === cardId) {
        return { selectedCard: null }
      }
      return { selectedCard: cardId }
    })
  },

  clearSelection: () => {
    set({ selectedCard: null });
  },

  isSelected: (cardId) => {
    return get().selectedCard === cardId
  },
  isNullSelected: () => {
    return get().selectedCard == null
  },

  getSelected: () => {
    return get().selectedCard
  },
}))