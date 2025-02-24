import { create } from "zustand";


export const steps = ["Información general", "Periodo de tiempo", "Resultados"];

const today = new Date().toISOString().split("T")[0];

export const useTargetForm = create((set, get) => ({
  activeStep: 0,
  formData: {
    title: "",
    formula_id: "",
    perspective_id: 1,
    start_date: today,
    end_date: "",
    optimal: "",
    tolerable: "",
    deficient: "",
    optimal_percentage: "",
    tolerable_percentage: "",
    deficient_percentage: "",
  },
  extraData: {
    optimalPercentage: "",
    tolerablePercentage: "",
    poorPercentage: "",
    start: new Date(),
  },
  setFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  setExtraData: (field, value) =>
    set((state) => ({
      extraData: { ...state.extraData, [field]: value },
    })),
  nextStep: () =>
    set((state) => ({
      activeStep: Math.min(state.activeStep + 1, steps.length - 1),
    })),
  setStep: (step) =>
      set((state) => ({
        activeStep: step,
      })),
  prevStep: () =>
    set((state) => ({
      activeStep: Math.max(state.activeStep - 1, 0),
    })),
  handleChange: (e) => {
      const { name, value } = e.target;
      set((state) => ({
        formData: { ...state.formData, [name]: value }, // Actualizar el campo específico
      }));
    },
 
}));
