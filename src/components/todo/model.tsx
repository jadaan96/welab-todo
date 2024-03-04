import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';
import {Todo,BasicModalProps} from '../../types'

const getModalStyle = () => {
  const width = window.innerWidth;
  let modalWidth = '70%';
  if (width <= 768) {
    modalWidth = '50%';
  } else if (width <= 480) {
    modalWidth = '70%';
  }
  return {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: modalWidth,
    backgroundColor: '#ffffff',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    borderRadius: 8,
    padding: 4,
  };
};


const buttonStyle: React.CSSProperties = {
  margin: '0 8px',
};

const BasicModal: React.FC<BasicModalProps> = ({ row, setTodos }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [data, setData] = React.useState<Todo>(row);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, text: event.target.value });
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, completed: event.target.checked });
  const handleCancel = () => handleClose();
  const handleEdit = () => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo => {
        if (todo.id === data.id) {
          return data;
        }
        return todo;
      });
      console.log(updatedTodos, "updatedTodos");

      return updatedTodos;
    });
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <EditIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={getModalStyle()}>
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
            <Button
              variant="contained"
              onClick={handleEdit}
              style={{ ...buttonStyle, backgroundColor: '#1976d2', color: '#ffffff' }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
