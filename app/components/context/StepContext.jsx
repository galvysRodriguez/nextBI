import { create } from 'zustand'

export const steps = ["Información general", "Periodo de tiempo", "Resultados"];

export const useStep = create((set) => ({
  activeStep: 0,
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
}))



