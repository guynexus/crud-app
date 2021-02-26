import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
// import {Button} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';

const modalStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    top: 100,
    backgroundColor: '#eee',//theme.palette.background.paper,
    // border: '0.0 solid #eee',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(0, 0, 0),
  },
}));
const ColorButton = withStyles((theme) => ({
  root: {
    backgroundColor: '',
    '&:hover': {
      backgroundColor: '#fde',
    },
  },
}))(IconButton);

export default function MyModal(params) {
  
  const classes = modalStyles();
  
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>      
      <ColorButton onClick={handleOpen} size='small'>{params.edit ? <EditIcon  style={{ fontSize: '0.8rem' }}/> : <AddCircleIcon  fontSize="small"/> } </ColorButton>
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
