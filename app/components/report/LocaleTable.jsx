"use client"
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { esES } from '@mui/material/locale';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Table from './Table';

const TableWithThemeProvider = ({rows, columns}) => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={createTheme(theme, esES)}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Table rows={rows} initialColumns={columns}/>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default TableWithThemeProvider;
