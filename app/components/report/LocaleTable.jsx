"use client"
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { esES } from '@mui/material/locale';
import Table from './Table';


const TableWithThemeProvider = ({children}) => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={createTheme(theme, esES)}>
        {children}
    </ThemeProvider>
  );
};

export default TableWithThemeProvider;
