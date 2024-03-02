export interface Todo {
    id: string;
    text: string;
    completed: boolean;
  }
  
  export interface TodoListTableProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  }
  