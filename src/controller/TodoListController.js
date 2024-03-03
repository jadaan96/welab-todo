export const useTodoListController = ({ todos, filttertodo,setTodos, setFiltterTodo, setSelected, selected,setPage ,setDense,setRowsPerPage}) => {
 
  
    const handleDelete = () => {
      const updatedTodos = todos.filter((todo) => !selected.includes(todo.id));
      setTodos(updatedTodos);
      setFiltterTodo(updatedTodos);
      setSelected([]);
    };
  
    const handleFilterChange = (filter) => {
      if (filter === 'completed') {
        setFiltterTodo(todos.filter((el) => el.completed === true));
      } else if (filter === 'pending') {
        setFiltterTodo(todos.filter((el) => el.completed === false));
      } else {
        setFiltterTodo(todos);
      }
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    };
    function stableSort(array) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }
      const handleSelectAllClick = (event) => {
        if (event.target.checked) {
          const newSelected = filttertodo.map((n) => n.id);
          setSelected(newSelected);
          return;
        }
        setSelected([]);
      };
    return {
      handleDelete,
      handleFilterChange,
      handleChangeDense,
      handleChangeRowsPerPage,
      handleChangePage,
      handleClick,
      stableSort,
      handleSelectAllClick
    };
  };
  