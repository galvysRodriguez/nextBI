import { InputDate } from "../utils/InputDate";


export function Filters({ dateRange, setDateRange }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg mb-4 mt-2 shadow-sm">
      <div className="flex items-end justify-end gap-4 w-full">
        <div className="max-w-[400px] items-center flex gap-4">
            <div>
                <InputDate
                label="Fecha inicial"
                values={dateRange.start}
                name="start"
                handleDateChange={(name) => (date) =>
                    setDateRange((prev) => ({ ...prev, [name]: date }))}
                />
            </div>
            <div>
                <InputDate
                label="Fecha final"
                values={dateRange.end}
                name="end"
                handleDateChange={(name) => (date) =>
                    setDateRange((prev) => ({ ...prev, [name]: date }))}
                />
            </div>
        </div>
      </div>
    </div>
  );
}