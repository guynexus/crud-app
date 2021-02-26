import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
// import {Button} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
// import StyledButton from '@material-ui/core/StyledButton'import;
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    top: 100,
    backgroundColor: '#ccc',//theme.palette.background.paper,
    border: '0.0 none #eee',
    // boxShadow: theme.shadows[5],s
    // padding: theme.spacing(0, 0, 0),
  },
  fab: {
    margin: theme.spacing(2),
    backgroundColor: 'red',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: 'red',
    }
  },
  button: {
    border: '1px solid red',
    backgroundColor: 'red',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: 'red',
    }
  }
}));

export default function MyModal(params) {
  
  const classes = useStyles();
  
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>      
      { params.edit 
        ? <IconButton className={classes.button} onClick={handleOpen} size='small'>
            <EditIcon className={classes.button} fontSize="small" /> 
          </IconButton>
        : 
        <Tooltip title="Add" aria-label="add">
          <Fab color="primary" className={classes.fab}>
            <AddCircleIcon />
          </Fab>
        </Tooltip>
      } 
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {params.children}
          </div>
        </Fade>
      </Modal>
    </>
  );
}
