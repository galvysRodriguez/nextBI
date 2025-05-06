import { create } from 'zustand'


export const useIsGrid = create((set) => ({
  grid: true,
  changeGrid: () => set((state) => ({ grid: !state.grid })),
}))

export const useIsExpanded = create((set) => ({
  expanded: false,
  changeExpanded: () => set((state) => ({ expanded: !state.expanded })),
}))

export const useGroupedName = create((set) => ({
  openGrouped: {},
  setOpenGrouped: (groupedName) =>
    set((state) => ({
      openGrouped: {
        ...state.openGrouped,
        [groupedName]: !state.openGrouped[groupedName],
      },
    })),
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

export const useCardStore = create((set, get) => ({
  selectedCard: null, 
  rowSelection: {}, 

  setRowSelection: (updater) => {
    set((state) => {
      // Si recibe una función (como useState), la ejecutamos
      const newSelection = typeof updater === 'function' 
        ? updater(state.rowSelection)
        : updater;
      
      return {
        rowSelection: newSelection,
        selectedCard: Object.keys(newSelection)[0] || null
      };
    });
  },

  handleSelect: (cardId) => {
    set((state) => {
      if (get().selectedCard === cardId) {
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

  getSelected: () => {
    return get().selectedCard
  },
}))