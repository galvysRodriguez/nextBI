import { create } from 'zustand';

export const useStep = create((set) => ({
  activeStep: 0,
  steps: [],
  
  setSteps: (newSteps) => set({ steps: newSteps }),

  nextStep: () =>
    set((state) => ({
      activeStep: Math.min(state.activeStep + 1, state.steps.length - 1),
    })),

  setStep: (step) =>
    set((state) => ({
      activeStep: step,
    })),
  
  prevStep: () =>
    set((state) => ({
      activeStep: Math.max(state.activeStep - 1, 0),
    })),
}));