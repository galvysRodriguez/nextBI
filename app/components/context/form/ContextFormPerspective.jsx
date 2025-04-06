"use client";
import { createContext, useContext, useMemo } from "react";
import { useForm } from "react-hook-form";

export const FormContext = createContext(null);

export function FormProvider({ children, defaultValues }) {
    const methods = useForm({ 
        defaultValues: {
          title: "",
          icons: null,
          tags: [],
          ...defaultValues
        },
        mode: 'onTouched' // Validar al perder el foco
      });
  
  // Memoizamos el valor del contexto para evitar re-renders innecesarios
  const value = useMemo(() => methods, [methods]);

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormPerspectiveContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};