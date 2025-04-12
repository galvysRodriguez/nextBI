"use client";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');


export function InputDate({label, values, error, name, handleDateChange, disabled=false}){
    return(
        <>
            <label className="block text-gray-700 text-sm font-semibold mb-[1px]">{label}</label>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <DesktopDatePicker
                  value={values ? dayjs(values) : null}
                  onChange={handleDateChange(name)}
                  disabled={disabled}
                  sx={{
                    width: '100%',
                    "& .MuiInputBase-root": {
                      width: "100%", 
                      height: "2.5rem",
                      padding: "0.5rem", 
                      border: error
                          ? "1px solid #ef4444"  
                          : "1px solid #ccc",     
                        borderRadius: "0.5rem",
                        backgroundColor: error
                          ? "rgba(254, 242, 242, 0.5)" 
                          : "transparent",
                        "&:hover": {
                          borderColor: error
                            ? "#ef4444" 
                            : "#9ca3af", 
                        },
                        "&.Mui-focused": {
                          border: error
                            ? "1px solid #ef4444"
                            : "2px solid #3b82f6", 
                          boxShadow: error
                            ? "0 0 0 2px rgba(239, 68, 68, 0.2)" 
                            : "",
                        },
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
        </>
    )
}