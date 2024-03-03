import React from 'react';
import PropTypes from 'prop-types'; // Add this import
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import the modal component

const FilterOptions = ({ onSelectFilter }) => {
  return (
    <List>
      <ListItemButton onClick={() => onSelectFilter('all')}>
        <ListItemText primary="All" />
      </ListItemButton>
      <ListItemButton onClick={() => onSelectFilter('completed')}>
        <ListItemText primary="Completed" />
      </ListItemButton>
      <ListItemButton onClick={() => onSelectFilter('pending')}>
        <ListItemText primary="Pending" />
      </ListItemButton>
    </List>
  );
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, onSelectFilter, onDelete } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleDelete = () => {
    setDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setDeleteConfirmation(false);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Todo List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => handleDelete(numSelected)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Filter list">
            <IconButton onClick={handleClick}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <FilterOptions onSelectFilter={onSelectFilter} />
          </Popover>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        open={deleteConfirmation}
        onClose={() => setDeleteConfirmation(false)}
        onConfirmDelete={handleConfirmDelete}
      />

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectFilter: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;
