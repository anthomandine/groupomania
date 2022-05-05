import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Avatar, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { URL } from '../App';

//--------------MUI dialog---------------------//

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);

  const [confirm, setConfirm] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //--------------end MUI dialog---------------------//

  //--------------Init variables---------------------//

  const [data, setData] = useState({ pseudo: "" });
  const [avatar, setAvatar] = useState(0);
  const avatars = [
    "../images/avatar/1.png",
    "../images/avatar/2.png",
    "../images/avatar/3.png",
    "../images/avatar/4.png",
    "../images/avatar/5.png",
    "../images/avatar/6.png",
    "../images/avatar/7.png",
    "../images/avatar/8.png",
    "../images/avatar/9.png"
  ];
  const isadmin = localStorage.getItem('isadmin');

  //--------------Récupération des input user---------------------//

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  //--------------Update user---------------------//

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {
      pseudo: data.pseudo,
      avatar: avatars[avatar]
    };
    let userId = localStorage.getItem('userId');
    let token = localStorage.getItem('token');
    axios({
      method: 'put',
      url: URL + '/api/auth/' + userId,
      data: userData,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(function (reponse) {
        setConfirm(true);
        props.isProfilLoad();
        // eslint-disable-next-line
        setTimeout(() => (window.location.reload(), setOpen(false)), 2000);
      })
      .catch(function (erreur) {
        console.log(erreur);
      });
  };

  //--------------delete user---------------------//

  const handleDelet = (e) => {
    e.preventDefault();

    swal({
      title: "Etes vous sure de vouloir supprimer votre compte ?",
      text: "La suppression sera définitive et votre adresse email inutilisable sur notre site !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Compte supprimer!", {
            icon: "success",
          });
          let token = localStorage.getItem('token');
          let userId = localStorage.getItem('userId');

          axios({
            method: 'put',
            url: URL + '/api/auth/delete/' + userId,
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
            .then(function (reponse) {
              console.log('user deleted at');
              localStorage.clear();
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            })
            .catch(function (err) {
              console.log(err);
            });
        } else {
          swal("Action Annulé !", {
            icon: "error",
          });
          setOpen(false);
        }
      });
  };

  return (
    <div className='profil'>
      <Button variant="text" startIcon={<EditIcon />} onClick={handleClickOpen}>
        Editer profil
      </Button>
      <form methode='put' >
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
            Editer profil
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <span>Nouveau Pseudo:</span>
            <TextField fullWidth
              id="input-pseudo"
              name="pseudo"
              label="pseudo" variant="outlined"
              helperText="Saisissez votre nouveau Pseudo"
              value={data.pseudo}
              onChange={handleChange}
            />
            <div className='avatar-content'>
              <span>Changer votre avatar :</span><br></br>
              {avatars.map((avatarUrl, index) => (
                <IconButton key={index} onClick={() => setAvatar(index)} className={index === avatar ? 'active' : ''}>
                  <Avatar alt="avatar-1" src={avatars[index]} />
                </IconButton>
              ))}
            </div>
            {confirm ? <Alert severity="success">Profil modifié avec succès</Alert> : ""}
          </DialogContent>
          <DialogActions>
            {parseInt(isadmin) === 0 && <Button onClick={handleDelet} color="error">supprimer mon compte</Button>}
            <Button autoFocus onClick={handleSubmit}>
              Sauvergarder
            </Button>
            <Button onClick={() => { setOpen(false) }}>Annuler</Button>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </div>
  );
}
