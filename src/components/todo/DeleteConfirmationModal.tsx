import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {DeleteConfirmationModalProps} from '../../types'



const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ open, onClose, onConfirmDelete }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#fff',
          boxShadow: 24,
          borderRadius: 8,
          p: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete this item?
        </Typography>
        <Button onClick={onConfirmDelete} variant="contained" color="error" style={{ marginRight: "1rem" }}>
          Delete
        </Button>
        <Button onClick={onClose} variant="contained" color="primary">
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
