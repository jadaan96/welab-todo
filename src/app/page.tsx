"use client"
import { Grid, TextField, FormControl, IconButton, Checkbox, Snackbar, Alert, AlertTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import TodoListTable from '../components/todo/TodoList'
import { v4 as randomUUID } from 'uuid';
export default function Home() {
    const [todoText, setTodoText] = useState('');
    const [todos, setTodos] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!todoText.trim()) return; // Don't add empty todos
        setTodos([...todos, { text: todoText, completed: false, id: randomUUID() }]);
        setTodoText('');
        // Show the alert
        setShowAlert(true);
      };
      useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
          console.log(todos);

        }
      }, []);
    
      // Save todos to local storage whenever todos change
      useEffect(() => {
       localStorage.setItem('todos', JSON.stringify(todos));
   
      
      }, [todos]);
    
    const handleChange = (e) => {
        setTodoText(e.target.value);
    };

    const handleToggleComplete = (index) => {
        // Find the todo item with the given index
        const updatedTodos = todos.map((todo) => {
          if (todo.id === index) {
            // Toggle the completion status
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        });
      
        // Update the todos state with the updated array
        setTodos(updatedTodos);
      };

    return (
        <Grid container spacing={2} columns={12}>
            <Grid item xs={3}>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth>
                        <TextField
                            id="todo-text"
                            label="Add Todo"
                            variant="outlined"
                            size="small"
                            autoFocus
                            required
                            value={todoText}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <IconButton type="submit" aria-label="add">
                        <AddIcon />
                    </IconButton>
                </form>
            </Grid>
            <Grid item xs={9}>
                {/* {todos.map((todo, index) => (
                    <div key={index}>
                        <Checkbox
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(index)}
                        />
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            {todo.text}
                        </span>
                    </div>
                ))} */}
                <TodoListTable todos={todos} setTodos={setTodos} handleToggleComplete={handleToggleComplete}/>
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
    );
}

