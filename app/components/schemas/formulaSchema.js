import * as yup from 'yup';

const validateFormula = (formula) => {
  try {
    const trimmedFormula = formula.trim();
    
    // 1. Fórmula vacía
    if (!trimmedFormula) {
      throw new Error("La fórmula no puede estar vacía");
    }

    // 2. Paréntesis balanceados
    const openParentheses = (trimmedFormula.match(/\(/g) || []).length;
    const closeParentheses = (trimmedFormula.match(/\)/g) || []).length;
    if (openParentheses !== closeParentheses) {
      throw new Error("Los paréntesis no están balanceados");
    }

    // 3. Llaves balanceadas
    const openBraces = (trimmedFormula.match(/\{/g) || []).length;
    const closeBraces = (trimmedFormula.match(/\}/g) || []).length;
    if (openBraces !== closeBraces) {
      throw new Error("Las llaves no están balanceadas");
    }

    // 4. Corchetes balanceados
    const openBrackets = (trimmedFormula.match(/\[/g) || []).length;
    const closeBrackets = (trimmedFormula.match(/\]/g) || []).length;
    if (openBrackets !== closeBrackets) {
      throw new Error("Los corchetes no están balanceados");
    }

    // 5. Operadores al final
    if (/(\+|-|\*|\/|\\cdot)$/.test(trimmedFormula)) {
      throw new Error("No puede haber operadores al final de la fórmula");
    }

    // 6. Operadores consecutivos
    if (/(\+|-|\*|\/|\\cdot){2,}/.test(trimmedFormula.replace(/\\cdot/g, '*'))) {
      throw new Error("No puede haber operadores consecutivos");
    }

    // 7. Fracciones válidas
    if (trimmedFormula.includes("\\frac")) {
      const validFractions = trimmedFormula.match(/\\frac\{[^}]+\}\{[^}]+\}/g);
      if (!validFractions || validFractions.length === 0) {
        throw new Error("Las fracciones no están correctamente formadas");
      }

      // Verificar divisiones entre cero
      const divisionsByZero = trimmedFormula.match(/\\frac\{[^}]+\}\{0\}/g);
      if (divisionsByZero && divisionsByZero.length > 0) {
        throw new Error("No se permite la división entre cero");
      }
    }

    // 8. Raíces válidas
    if (trimmedFormula.includes("\\sqrt")) {
      const validRoots = trimmedFormula.match(/\\sqrt\{[^}]+\}/g);
      if (!validRoots || validRoots.length === 0) {
        throw new Error("Las raíces no están correctamente formadas");
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
        throw new Error(`Comando LaTeX no válido: ${command}`);
      }
    }

    // 10. Caracteres no permitidos
    const forbiddenChars = ["#", "$", "%", "&", "_", "~", "^", "sin", "cos", "tan", "log", "ln"];
    for (const char of forbiddenChars) {
      if (trimmedFormula.includes(char)) {
        throw new Error(`Carácter no permitido: ${char}`);
      }
    }

    // 11. Exponentes no válidos
    if (trimmedFormula.includes("^")) {
      const emptyExponents = trimmedFormula.match(/\^\{\}/g);
      if (emptyExponents && emptyExponents.length > 0) {
        throw new Error("No se permite un exponente vacío");
      }
    }

    // 12. Variables y operadores permitidos
    const allowedOptions = [
      "nuevosClientes", "Ventas", "Compras", "Clientesfinales",
      "SUM", "COUNT", "AVG", "MAX", "MIN", "+", "-", ".", "/", "*", 
      "\\cdot", "\\frac", "(", ")", "{", "}", "\\sqrt"
    ];
    
    const formulaWithoutLeftRight = trimmedFormula.replace(/\\left|\\right|\\ /g, "");
    const formulaParts = formulaWithoutLeftRight.split(/(\\cdot|\\frac|[+\-*/(){}])/).filter(Boolean);

    for (const part of formulaParts) {
      if (!allowedOptions.includes(part) && isNaN(part)) {
        throw new Error(`Elemento no permitido en la fórmula: ${part}`);
      }
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const formulaSchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(5, 'El título debe tener al menos 5 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  tags: yup
    .array()
    .min(1, 'Debe seleccionar al menos una etiqueta')
    .required('Las etiquetas son obligatorias'),
  formula: yup
    .string()
    .required('La fórmula es obligatoria')
    .test('valid-formula', 'Fórmula inválida', validateFormula)
});