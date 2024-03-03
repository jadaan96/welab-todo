import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#ffffff',
  boxShadow: 24,
  borderRadius: 8,
  p: 4,
};

const buttonStyle = {
  margin: '0 8px',
};

export default function BasicModal({row,setTodos,todos}) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(row);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInputChange = (event) => setData({ ...data, text: event.target.value });
  const handleCheckboxChange = (event) => setData({ ...data, completed: event.target.checked });
  const handleCancel = () => {
    handleClose();
  };
  const handleEdit = (e) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => {
        if (todo.id === data.id) {
          return data;
        }
        return todo;
      });
      console.log(updatedTodos),"updatedTodos";

      return updatedTodos;
    });
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen} >
      <EditIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
            Edit Text
          </Typography>
          <TextField
            id="outlined-basic"
            label="Enter Text"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.text}
            onChange={handleInputChange}
          />
          <FormControlLabel
            control={<Checkbox checked={data.completed} onChange={handleCheckboxChange} />}
            label="completed"
          />
          <Box mt={2} textAlign="right">
            <Button variant="contained" onClick={handleCancel} style={buttonStyle}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleEdit} style={{ ...buttonStyle, backgroundColor: '#1976d2', color: '#ffffff' }}>
              Edit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

