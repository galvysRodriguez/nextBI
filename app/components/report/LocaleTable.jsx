"use client"
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
import { esES } from '@mui/material/locale';
import Table from './Table';

const TableWithThemeProvider = ({rows, columns}) => {
  const theme = useTheme();
  return (
    <ThemeProvider theme={createTheme(theme, esES)}>
      <Table rows={rows} initialColumns={columns}/>
    </ThemeProvider>
  );
};

export default TableWithThemeProvider;
