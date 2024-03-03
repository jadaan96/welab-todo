export interface Todo {
    id: string;
    text: string;
    completed: boolean;
  }
  
  export interface TodoListTableProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  }
  export interface BasicModalProps {
    row: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    todos: Todo[];
  }
  export interface HeadCell {
    id: string;
    numeric: boolean;
    disablePadding: boolean;
    label: string;
  }
  
  export interface EnhancedTableHeadProps {
    numSelected: number;
    rowCount: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    headCells: HeadCell[];
  }
  export interface DeleteConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
  }
  
export interface EnhancedTableToolbarProps {
  numSelected: number;
  onSelectFilter: (filter: string) => void;
  onDelete: () => void;
}
export interface EnhancedTableHead {
  numSelected: number;
  onSelectFilter: (filter: string) => void;
  onDelete: () => void;
}
