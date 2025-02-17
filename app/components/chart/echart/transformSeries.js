export const transformSeriesToValues = (series, categories) => {
  // Aseguramos que series sea un array de objetos con la propiedad 'data'
  return series[0]?.data.map((value, index) => {
    // Si no hay más categorías, usamos un valor por defecto
    const category = categories[index] || `inv${index + 1}`; // 'invX' por defecto

    return {
      value,          // Asignamos el valor directamente
      name: category  // Asignamos la categoría correspondiente o el valor por defecto
    };
  });
};
