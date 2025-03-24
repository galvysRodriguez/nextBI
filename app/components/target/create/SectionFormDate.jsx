import { useTargetForm } from "../../context/FormTarget";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es'
import { Button } from "../../utils/Input";
import { useStep } from "../../context/StepContext";

dayjs.locale('es')

export function SectionFormDateTarget({ isCreate }) {
    const { setFormData, formData, handleStartDateChange, handleEndDateChange} = useTargetForm();
    const {prevStep, nextStep } = useStep()
    return (
      <div>
        <h2 className="text-xl text-center font-semibold mb-4">
          Seleccionar Fechas
        </h2>
        <div className="w-[80%] h-[370px] m-auto pt-2 flex flex-col justify-between">
          <div className="flex flex-col justify-center">
            <label className="block text-gray-700 text-sm font-semibold mb-[1px]">Fecha inicial</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                value={formData.start_date ? dayjs(formData.start_date) : null}
                onChange={handleStartDateChange}
                fullWidth
                disabled={isCreate}
                sx={{
                    "& .MuiInputBase-root": {
                      width: "100%", 
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
            <label className="block text-gray-700 text-sm font-semibold mb-[1px]">Fecha final</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                value={formData.end_date ? dayjs(formData.end_date) : null}
                onChange={handleEndDateChange}
                fullWidth
                sx={{
                    "& .MuiInputBase-root": {
                      width: "100%", 
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
          </div>
         <div className="mt-8 flex flex-col">
                     <Button
                      type="submit"
                      variant="primary"
                      onClick={nextStep}
                    >
                      Siguiente
                    </Button>
                    <Button
                      type="button"
                      onClick={prevStep}
                      variant="secondary"
                    >
                      Volver
                    </Button>
          </div>
        </div>
        
      </div>
    );
  }