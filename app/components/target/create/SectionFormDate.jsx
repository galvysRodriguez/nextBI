import { useTargetForm } from "../../context/FormTarget";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'

dayjs.locale('es')

export function SectionFormDateTarget({ isCreate }) {
    const { prevStep, nextStep, setFormData, formData, handleStartDateChange, handleEndDateChange} =
      useTargetForm();
    return (
      <div>
        <h2 className="text-xl text-center font-semibold mb-4">
          Seleccionar Fechas
        </h2>
        <label className="block mb-2">Fecha de Inicio</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
            value={formData.start_date ? dayjs(formData.start_date) : null}
            onChange={handleStartDateChange}
            fullWidth
            disabled={isCreate}
            sx={{
                "& .MuiInputBase-root": {
                  width: "29rem", 
                  height: "2.5rem",
                  padding: "0.5rem", 
                  border: "1px solid #ccc", 
                  borderRadius: "0.5rem", 
                  marginBottom: "1rem", 
                },
                "& .MuiInputBase-input": {
                  padding: "0", 
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            
            />
        </LocalizationProvider>
        <label className="block mb-2">Fecha Fin</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
            value={formData.end_date ? dayjs(formData.end_date) : null}
            onChange={handleEndDateChange}
            fullWidth
            sx={{
                "& .MuiInputBase-root": {
                  width: "29rem", 
                  height: "2.5rem",
                  padding: "0.5rem", 
                  border: "1px solid #ccc", 
                  borderRadius: "0.5rem", 
                  marginBottom: "1rem", 
                },
                "& .MuiInputBase-input": {
                  padding: "0", 
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
            
            />
        </LocalizationProvider>
  
        <div className="flex justify-between pt-16">
          
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Anterior
            </button>
        
  
          <button
            type="button"
            onClick={nextStep}
            className="bg-[#085494] text-white px-4 py-2 rounded-lg"
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  }