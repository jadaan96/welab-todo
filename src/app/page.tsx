"use client"
import React, { useEffect, useState } from 'react';
import { Grid, TextField, FormControl, useTheme, IconButton, Snackbar, Alert, AlertTitle, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TodoListTable from '../components/todo/TodoList';
import { v4 as randomUUID } from 'uuid';
import { Todo } from '../types';
import {  Paper} from '@mui/material';
import './styles.css'; // Import the CSS file

export default function Home() {
    const [todoText, setTodoText] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const theme = useTheme();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!todoText.trim()) return; // Don't add empty todos
        const newTodo: Todo = {
            text: todoText,
            completed: false,
            id: randomUUID(),
        };
        setTodos([...todos, newTodo]);
        setTodoText('');
        // Show the alert
        setShowAlert(true);
    };

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');

        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    // Save todos to local storage whenever todos change
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value);
    };

    return (
        <Paper sx={{ width: '100%' ,minHeight:"110vh",padding:"0",margin:"0"}}>
          
        <Grid container justifyContent="center" className="container">
            <Grid item xs={12} md={12} className="headerContainer">
                <Box className="headerTextContainer">
                    <Typography variant="h3" className="headerText">ToDo App</Typography>
                </Box>
                <Box  className= {theme.palette.mode === 'dark' ? 'formContainer2' : 'formContainer'} >
                    <Typography variant="h5" gutterBottom>
                        Add a New Todo
                    </Typography>
                    <Paper>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                         <FormControl fullWidth>
                            <TextField
                                id="todo-text"
                                label="Enter your todo here"
                                variant="outlined"
                                size="small"
                                autoFocus
                                required
                                value={todoText}
                                onChange={handleChange}
                                InputProps={{ className: theme.palette.mode === 'dark' ? 'dark' : 'light' }}
                                />
                        </FormControl>
                 
                        <IconButton type="submit" aria-label="add" >
                            <AddIcon />
                            
                        </IconButton>
                    </form>
                    
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <TodoListTable todos={todos} setTodos={setTodos} />
            </Grid>
            <Snackbar
                open={showAlert}
                autoHideDuration={3000}
                onClose={() => setShowAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setShowAlert(false)}>
                    <AlertTitle>Success</AlertTitle>
                    Todo added successfully
                </Alert>
            </Snackbar>
        </Grid>
        </Paper>
    );
}
