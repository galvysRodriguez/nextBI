// components/CustomTable.js
"use client"
import {useMemo} from 'react';
import { useTable } from 'react-table';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CustomTable = ({ data }) => {
  const columns = useMemo(
    () => [
      { Header: 'Título', accessor: 'title' },
      { Header: 'Perspectiva', accessor: 'perspective' },
      { Header: 'Indicador', accessor: 'indicator' },
      { Header: 'Agregación', accessor: 'aggregation' },
      { Header: 'Fecha de inicio', accessor: 'startDate' },
      { Header: 'Fecha culminación', accessor: 'endDate' },
      { Header: 'Resultado obtenido', accessor: 'objectiveResult' },
      { Header: 'Resultado esperado', accessor: 'expectedResult' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <TableContainer component={Paper}>
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
