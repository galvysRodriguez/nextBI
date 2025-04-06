import { create } from "zustand";
import dayjs from 'dayjs';

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
  tags: [],
}

export const useTargetForm = create((set, get) => ({
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
  handleChange: (e) => {
      const { name, value } = e.target;
      set((state) => ({
        formData: { ...state.formData, [name]: value }, 
      }));
    },
  handleEndDateChange: (newValue) => {
      set((state) => ({
        formData: { ...state.formData, end_date: newValue }, 
      }));
    },
  handleStartDateChange: (newValue) => {
      set((state) => ({
        formData: { ...state.formData, start_date: newValue }, 
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
  setTags: (newTags) => 
    set((state) => ({
      formData: {
        ...state.formData,
        tags: newTags, 
      },
    })),
  setIcons: (newTags) => 
    set((state) => ({
      formData: {
        ...state.formData,
        icons: newTags, 
      },
    })),
    setIndicators: (newTags) => 
    set((state) => ({
      formData: {
        ...state.formData,
        indicators: newTags, 
      },
    })),
    setPerspectives: (newTags) => 
    set((state) => ({
      formData: {
        ...state.formData,
        perspectives: newTags, 
      },
    })),

}));
