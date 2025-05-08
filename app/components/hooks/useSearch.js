import { create } from 'zustand';

const keys = [
  "id",
  "title",
  "perspective",
  "indicator",
  "current",
  "target",
  "unit",
  "start",
  "end",
  "status",
  "responsible",
  "priority",
];


export const useTargetStore = create((set, get) => ({
  search: '', 
  data: [],   


  changeSearch: (search) => set({ search }),


  deleteById: (id) => set((state) => ({
    data: state.data.filter((item) => item.id !== id),
  })),

  changeData: (data) => set({ data }),

  searchResults: () => {
    const { search, data } = get(); 
    if (!search) return get().data;

    return data.filter((row) =>
      keys.some((key) =>
        row[key]?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  },

  clearSearch: () => set({ search: '' }),
  getData: () => { return get().data },
}));

export const usePageTarget = create((set, get) => ({
  page: 1,
  setPage: (page) => set({ page }),
}));
