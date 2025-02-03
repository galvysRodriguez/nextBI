import { create } from "zustand";
import { FormInfoTarget } from "../target/create/FormInfoTarget";
import { FormDateTarget } from "../target/create/FormDateTarget";
import { FormResultTarget } from "../target/create/FormResultTarget";

export const steps = ["Información general", "Periodo de tiempo", "Resultados"];

export const useTargetForm = create((set, get) => ({
  activeStep: 0,
  formData: {
    title: "",
    indicator: "",
    agregation: "",
    period: "",
    target: "",
    optimalValue: "",
    tolerableValue: "",
    poorValue: "",
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
  handleNext: () =>
    set((state) => ({
      activeStep: Math.min(state.activeStep + 1, steps.length - 1),
    })),
  handleBack: () =>
    set((state) => ({
      activeStep: Math.max(state.activeStep - 1, 0),
    })),
  renderView: () => {
    const { activeStep } = get();
    switch (activeStep) {
      case 0:
        return <FormInfoTarget />;
      case 1:
        return <FormDateTarget />;
      case 2:
        return <FormResultTarget />;
      default:
        return <div>Vista no encontrada</div>;
    }
  },
}));
