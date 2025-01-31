import { useSearchTarget } from "../context/IsGrid"


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
  "priority"
]

export function useSearch(data) {
    const search = useSearchTarget((state) => state.search);

  const goSearch = () => {
    if (!search) return data

    return data.filter((row) =>
      keys.some((key) =>
        row[key]?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return goSearch()
}
