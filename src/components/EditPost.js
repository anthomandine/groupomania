import { Alert, Button, DialogActions, IconButton, TextField } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { URL } from '../App';
import AddIcon from '@mui/icons-material/Add';
import { validPost } from '../components/Regex';

let BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const EditPost = (props) => {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({
        id: props.postId,
        text: props.postText,
        image: props.imgUrl
    });
    const [editSuccess, setEditSuccess] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    let BootstrapDialogTitle = (props) => {
        let { children, onClose, ...other } = props;

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

    const handleChangeImg = (e) => {
        const file = e.target.files[0];
        setData({
            ...data,
            [e.target.name]: file,
        });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    const save = () => {

        if (validPost.test(data.post)) {
            const token = localStorage.getItem('token');

            let form = new FormData();
            form.append('text', data.text);
            form.append('image', data.image);

            axios({
                method: 'put',
                url: URL + '/api/post/' + data.id,
                data: form,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(function (reponse) {
                    setEditSuccess(true);
                    setTimeout(() => {
                        setEditSuccess(false);
                        handleClose();
                        props.isLoadF();
                        if (props.renderPost) {
                            props.renderPost();
                        }
                    }, 1200);
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        else {
            return;
        }
    };

    return (
        <div>
            <IconButton aria-label="edit" size="large" onClick={handleClickOpen}  >
                <EditIcon />
            </IconButton>

            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edition Post
                </BootstrapDialogTitle>
                <DialogContent>
                    <form method="put">
                        <p>ID n° {props.postId} </p>
                        <TextField
                            margin="dense"
                            multiline
                            id="text"
                            name='text'
                            label="Modifier le texte"
                            defaultValue={data.text}
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                        <div className='add-img'>
                            <label>
                                <Button component="span">
                                    <AddIcon />Changer mon fichier
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        onChange={handleChangeImg}
                                    />
                                </Button>
                            </label>
                        </div>
                    </form>
                    {editSuccess && <div className='edit-success'><Alert severity="success">Post modifié !</Alert></div>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Retour</Button>
                    <Button onClick={save} >Enregistrer</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );

};

export default EditPost;