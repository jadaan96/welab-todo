import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Paper,
    Checkbox,
    FormControlLabel,
    Switch,
} from '@mui/material';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import BasicModal from './model';
import { Todo, TodoListTableProps } from '../../types';
import { useTodoListController } from '../../controller/TodoListController';

const TodoListTable: React.FC<TodoListTableProps> = ({ todos, setTodos }: TodoListTableProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filteredTodo, setFilteredTodo] = useState<Todo[]>([]);
    const { handleDelete, stableSort, handleSelectAllClick, handleFilterChange, handleChangeDense, handleChangeRowsPerPage, handleChangePage, handleClick } = useTodoListController({
        todos,
        setTodos,
        setFilteredTodo,
        setSelected,
        selected,
        setPage,
        setDense,
        setRowsPerPage,
        filteredTodo,
    });

    const isSelected = (id: string) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - todos.length) : 0;

    const visibleRows = useMemo(() => stableSort(todos).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [page, rowsPerPage, todos]);

    useEffect(() => {
        setFilteredTodo(visibleRows);
    }, [visibleRows, todos]);

    return (
<Box
  sx={{
    width: '100%',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)' ,
    // borderRadius:"2%"
    padding:"10px"
  }}
>            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    onSelectFilter={handleFilterChange}
                    onDelete={handleDelete}
                />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            rowCount={todos.length}
                            onSelectAllClick={handleSelectAllClick}
                            headCells={[]} // Pass your headCells array here
                        />
                        <TableBody>
                            {filteredTodo.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{ cursor: 'pointer' }}
                                        style={{ backgroundColor: row.completed ? '#01c851' : '#ff4443' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                                aria-checked={isItemSelected}
                                                onClick={(event) => handleClick(event, row.id)}
                                            />

                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row" padding="none">
                                            {row.text}
                                        </TableCell>
                                        <TableCell align="center">{row.completed ? 'Completed' : 'Pending'}</TableCell>
                                        <TableCell align="right">
                                        <BasicModal row={row} setTodos={setTodos} todos={todos} />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={todos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </Box>
    );
};

export default TodoListTable;
