import { create } from "zustand";


export const steps = ["Información general", "Periodo de tiempo", "Resultados"];

const today = new Date().toISOString().split("T")[0]

const initialData= {
  title: "",
  formula_id: "",
  perspective_id: 1,
  start_date: today,
  end_date: "",
  optimal: "",
  tolerable: "",
  deficient: "",
}

export const useTargetForm = create((set, get) => ({
  activeStep: 0,
  formData: initialData,
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
        formData: { ...state.formData, [name]: value }, 
      }));
    },
  setFullFormData: (newData) => set({ formData: newData }),
  clearSelection: () => ({formData:initialData}),
  adjustStartDate: () => {
    const currentStartDate = get().formData.start_date;
    const formattedDate = new Date(currentStartDate).toISOString().split("T")[0];
    set((state) => ({
      formData: { ...state.formData, start_date: formattedDate },
    }));
  },

  adjustEndDate: () => {
    const currentEndDate = get().formData.end_date;
    if (currentEndDate) {
      const formattedDate = new Date(currentEndDate).toISOString().split("T")[0];
      set((state) => ({
        formData: { ...state.formData, end_date: formattedDate },
      }));
    }
  },
}));
