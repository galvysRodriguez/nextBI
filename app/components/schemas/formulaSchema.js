import * as yup from 'yup';

const allowedOptions = [
  "nuevosClientes", "Ventas", "Compras", "Clientesfinales",
  "SUM", "COUNT", "AVG", "MAX", "MIN", "+", "-", ".", "/", "*", "^",
  "\\cdot", "\\frac", "(", ")", "{", "}", "\\sqrt"
];

const validCommands = [
  "\\sin", "\\cos", "\\tan", "\\log", "\\ln", "\\sqrt", "\\frac",
  "\\sum", "\\prod", "\\int", "\\oint", "\\lim", "\\infty", "\\pm", 
  "\\mp", "\\times", "\\div", "\\cdot", "\\leq", "\\geq", "\\neq", 
  "\\approx", "\\equiv", "\\left", "\\right", "\\{", "\\}", "\\(", 
  "\\)", "\\[", "\\]", 
];

const forbiddenChars = ["#", "$", "&", "_", "~", "sin", "cos", "tan", "log", "ln", "%"];

const validateFormula = (formula) => {
  try {
    const trimmedFormula = formula.trim();
    
    // 1. Fórmula vacía
    if (!trimmedFormula) {
      return "La fórmula no puede estar vacía";
    }

    // 2. Paréntesis balanceados
    const openParentheses = (trimmedFormula.match(/\(/g) || []).length;
    const closeParentheses = (trimmedFormula.match(/\)/g) || []).length;
    if (openParentheses !== closeParentheses) {
      return "Los paréntesis no están balanceados";
    }

    // 3. Llaves balanceadas
    const openBraces = (trimmedFormula.match(/\{/g) || []).length;
    const closeBraces = (trimmedFormula.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      return "Las llaves no están balanceadas";
    }

    // 4. Corchetes balanceados
    const openBrackets = (trimmedFormula.match(/\[/g) || []).length;
    const closeBrackets = (trimmedFormula.match(/\]/g) || []).length;
    if (openBrackets !== closeBrackets) {
      return "Los corchetes no están balanceados";
    }

    // 5. Operadores al final
    if (/(\+|-|\*|\/|\\cdot)$/.test(trimmedFormula)) {
      return "No puede haber operadores al final de la fórmula";
    }

    // 6. Operadores consecutivos
    if (/(\+|-|\*|\/|\\cdot){2,}/.test(trimmedFormula.replace(/\\cdot/g, '*'))) {
      return "No puede haber operadores consecutivos";
    }

    // 7. Fracciones válidas
    if (trimmedFormula.includes("\\frac")) {
      const validFractions = trimmedFormula.match(/\\frac\{[^}]+\}\{[^}]+\}/g);
      if (!validFractions || validFractions.length === 0) {
        return "Las fracciones no están correctamente formadas";
      }

      // Verificar divisiones entre cero
      const divisionsByZero = trimmedFormula.match(/\\frac\{[^}]+\}\{0\}/g);
      if (divisionsByZero && divisionsByZero.length > 0) {
        return "No se permite la división entre cero";
      }
    }

    // 8. Raíces válidas
    if (trimmedFormula.includes("\\sqrt")) {
      const validRoots = trimmedFormula.match(/\\sqrt\{[^}]+\}/g);
      if (!validRoots || validRoots.length === 0) {
        return "Las raíces no están correctamente formadas";
      }
    }

    // 9. Comandos LaTeX válidos
    const validCommands = [
      "\\sin", "\\cos", "\\tan", "\\log", "\\ln", "\\sqrt", "\\frac",
      "\\sum", "\\prod", "\\int", "\\oint", "\\lim", "\\infty", "\\pm", 
      "\\mp", "\\times", "\\div", "\\cdot", "\\pm", "\\mp", "\\leq", 
      "\\geq", "\\neq", "\\approx", "\\equiv", "\\left", "\\right", 
      "\\{", "\\}", "\\(", "\\)", "\\[", "\\]"
    ];
    const commandsInFormula = trimmedFormula.match(/\\[a-zA-Z]+/g) || [];
    for (const command of commandsInFormula) {
      if (!validCommands.includes(command)) {
        return `Comando LaTeX no válido: ${command}`;
      }
    }

    // 10. Caracteres no permitidos
    const forbiddenChars = ["#", "$", "&", "_", "~", "sin", "cos", "tan", "log", "ln"];
    for (const char of forbiddenChars) {
      if (trimmedFormula.includes(char)) {
        return `Carácter no permitido: ${char}`;
      }
    }

    // 11. Exponentes no válidos
    if (trimmedFormula.includes("^")) {
      const emptyExponents = trimmedFormula.match(/\^\{\}/g);
      if (emptyExponents && emptyExponents.length > 0) {
        return "No se permite un exponente vacío";
      }
    }

    // 12. Variables y operadores permitidos
    const allowedOptions = [
      "nuevosClientes", "Ventas", "Compras", "Clientesfinales",
      "SUM", "COUNT", "AVG", "MAX", "MIN", "+", "-", ".", "/", "*", "%", "^",
      "\\cdot", "\\frac", "(", ")", "{", "}", "\\sqrt"
    ];
    
    const formulaWithoutLeftRight = trimmedFormula.replace(/\\left|\\right|\\ /g, "");
    const formulaParts = formulaWithoutLeftRight.split(/(\\cdot|\\frac|[+\-*/(){}])/).filter(Boolean);

    for (const part of formulaParts) {
      if (!allowedOptions.includes(part) && isNaN(part)) {
        return `Elemento no permitido en la fórmula: ${part}`;
      }
    }

    return true;
  } catch (error) {
    return "Error al validar la fórmula";
  }
};


// Comandos LaTeX válidos permitido

export const formulaSchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),

  tag_id: yup
    .number()
    .required('La etiqueta es obligatoria'),

  formula: yup
    .string()
    .required("La fórmula es obligatoria")
    .test("is-valid-formula", "Fórmula no válida", function (value) {
      const { path, createError } = this;
      const formula = (value || "").trim();

      if (!formula) return createError({ path, message: "La fórmula no puede estar vacía" });

      const pairs = [
        { open: '(', close: ')', name: 'paréntesis' },
        { open: '{', close: '}', name: 'llaves' },
        { open: '[', close: ']', name: 'corchetes' }
      ];
      for (const { open, close, name } of pairs) {
        const openCount = (formula.match(new RegExp(`\\${open}`, "g")) || []).length;
        const closeCount = (formula.match(new RegExp(`\\${close}`, "g")) || []).length;
        if (openCount !== closeCount) {
          return createError({ path, message: `Las ${name} no están balanceadas` });
        }
      }
      if (/(\+|-|\*|\/|\\cdot|\^)$/.test(formula)) {
        return createError({ path, message: "No puede haber operadores al final de la fórmula" });
      }
      const cleaned = formula.replace(/\\cdot/g, '*');
      if (/([+\-*/^]{2,})/.test(cleaned)) {
        return createError({ path, message: "No puede haber operadores consecutivos" });
      }

      if (formula.includes("\\frac")) {
        const validFractions = formula.match(/\\frac\{[^}]+\}\{[^}]+\}/g);
        if (!validFractions || validFractions.length === 0) {
          return createError({ path, message: "Las fracciones no están correctamente formadas" });
        }
        const divisionsByZero = formula.match(/\\frac\{[^}]+\}\{0\}/g);
        if (divisionsByZero && divisionsByZero.length > 0) {
          return createError({ path, message: "No se permite la división entre cero" });
        }
      }

      // 6. Raíces bien formadas
      if (formula.includes("\\sqrt")) {
        const validRoots = formula.match(/\\sqrt\{[^}]+\}/g);
        if (!validRoots || validRoots.length === 0) {
          return createError({ path, message: "Las raíces no están correctamente formadas" });
        }
      }

      // 7. Comandos válidos
      const commandsInFormula = formula.match(/\\[a-zA-Z]+/g) || [];
      for (const command of commandsInFormula) {
        if (!validCommands.includes(command)) {
          return createError({ path, message: `Comando LaTeX no válido: ${command}` });
        }
      }

      // 8. Caracteres no permitidos
      const forbiddenChars = ["#", "$", "&", "_", "~", "sin", "cos", "tan", "log", "ln"];
      for (const char of forbiddenChars) {
        if (formula.includes(char)) {
          return createError({ path, message: `Carácter no permitido: ${char}` });
        }
      }

      // 9. Exponentes vacíos
      if (formula.includes("^")) {
        const emptyExponents = formula.match(/\^\{\}/g);
        if (emptyExponents && emptyExponents.length > 0) {
          return createError({ path, message: "No se permite un exponente vacío" });
        }
      }

      // 10. Elementos no permitidos
      const formulaWithoutLaTeX = formula.replace(/\\left|\\right|\\ /g, "");
      const parts = formulaWithoutLaTeX
        .split(/(\\cdot|\\frac|\\sqrt|[+\-*/^%(){}])/)
        .filter(Boolean)
        .map(p => p.trim());

      for (const part of parts) {
        if (
          !allowedOptions.includes(part) &&
          isNaN(Number(part)) &&
          !/^\\[a-zA-Z]+$/.test(part) // comandos
        ) {
          return createError({ path, message: `Elemento no permitido en la fórmula: ${part}` });
        }
      }

      return true;
    }),
});
