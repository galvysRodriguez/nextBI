import { create } from 'zustand'


export const useIsGrid = create((set) => ({
  grid: true,
  changeGrid: () => set((state) => ({ grid: !state.grid })),
}))

export const useIsExpanded = create((set) => ({
  expanded: false,
  changeExpanded: () => set((state) => ({ expanded: !state.expanded })),
}))

export const useIsMobile = create((set) => ({
  mobile: false,
  changeMobile: () => set((state) => ({ mobile: !state.mobile })),
}))

export const useSearchTarget = create((set) => ({
  search: "",
  changeSearch: (search) => set({ search }),
}))

export const useMenuMobile = create((set, get) => ({
  menuMobile: false,
  changeMenuMobile: () => {
    set((state) => ({ menuMobile: !state.menuMobile }));
    useIsExpanded.getState().changeExpanded();
  }
}));

export const useSectionOpen = create((set) =>({
  sectionOpen: {},
  toggleSection: (section) => {
    set((state) => ({
      sectionOpen: {
        ...state.sectionOpen, 
        [section]: !state.sectionOpen[section],
      },
    }));
  },
}))

export const useDataForm = create((set) => ({
  formData: {
    title: "",
    formula: "",
  },
  handleChange: (e) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [e.target.name]: e.target.value,
      },
    }));
  },
  handleFormulaChange: (mathField) => {
    set((state) => ({
      formData: {
        ...state.formData,
        formula: mathField.latex(),
      },
    }));
  },
  handleKeyDown: (event, mathField) => {
    if (event.key === "Backspace") {
      set((state) => {
        let formula = mathField.latex();
        const terms = formula.trim().split(/(?=[+\-*/()^])/);
        terms.pop();
        formula = terms.join(""); 
        mathField.latex(formula); 
  
        return {
          formData: {
            ...state.formData,
            formula: formula,
          },
        };
      });
    }
  },
  addElement: (element) => {
    set((state) => ({
      formData: {
        ...state.formData,
        formula: state.formData.formula + element,
      },
    }));
  },
}));

export const useCardStore = create((set, get) => ({
  selectedCard: null, 

  handleSelect: (cardId) => {
    set((state) => {
      if (state.selectedCard === cardId) {
        return { selectedCard: null }
      }
      return { selectedCard: cardId }
    })
  },

  clearSelection: () => {
    set({ selectedCard: null });
  },

  isSelected: (cardId) => {
    return get().selectedCard === cardId
  },

  isNullSelected: () => {
    return get().selectedCard == null
  },
}))