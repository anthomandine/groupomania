import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import "moment/locale/fr";


//--------------MUI dialog---------------------//

let BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

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

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogsAdmin() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };
    //--------------end MUI dialog---------------------//

    //--------------Init variables---------------------//

    const [data, setData] = useState([]);
    const [dataPosts, setDataPosts] = useState([]);
    const [usersIsEmpty, setusersIsEmpty] = useState(true);
    const [postsIsEmpty, setpostIsEmpty] = useState(true);

    //---------------render users in admin -------------//

    const renderUsers = () => {

        setpostIsEmpty(true);
        setDataPosts([]);

        let token = localStorage.getItem('token');
        let isadmin = localStorage.getItem('isadmin');

        const axiosGet = async () => {
            const reponse = await axios.get('http://localhost:3000/api/auth/' + isadmin + '/users', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            setData(reponse.data);
            setusersIsEmpty(false);
        };
        axiosGet();
    };

    //---------------Fonction delete users et posts -------------//

    const handleDelet = (props) => {

        if (props.idpost) {

            let confirm = window.confirm("Voulez vous vraiment supprimer le post ?");

            if (confirm) {
                let token = localStorage.getItem('token');
                let idpost = props.idpost;
                let url = props.imageUrl;

                axios({
                    method: 'delete',
                    url: 'http://localhost:3000/api/post/' + idpost,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                    data: { url }
                })
                    .then(function (reponse) {
                        renderPosts();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
            else {
                console.log('coucou else');
            }
        }
        else {
            let confirm = window.confirm("La suppression sera définitive et le email inutilisable, on continue ?");

            if (confirm) {
                let token = localStorage.getItem('token');
                let userId = props.userId;
                axios({
                    method: 'put',
                    url: 'http://localhost:3000/api/auth/delete/' + userId,
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(function (reponse) {
                        renderUsers();
                    })
                    .catch(function (erreur) {
                        console.log(erreur);
                    });
            }
            else {
                console.log('coucou else');
            }
        }
    };

    //---------------table users-------------//

    const renderButtonDelete = (props) => {
        return (
            <Button
                variant="text"
                color="primary"
                size="small"
                onClick={() => handleDelet(props)}
            >
                <DeleteIcon />
            </Button>
        )
    };

    const columns = [
        { field: 'userId', headerName: 'UserId', width: 70 },
        { field: 'pseudo', headerName: 'Pseudo', width: 180 },
        { field: 'deleted_at', headerName: 'Supprimé le', width: 150 },
        { field: 'email', headerName: 'email', width: 220 },
        {
            field: 'delet_button', headerName: 'Supprimer compte', width: 130, renderCell: (val) => {
                return val.row.delet_button;
            }
        }
    ];

    let rows = data.map((user) => (
        {
            userId: user.userId,
            pseudo: user.pseudo,
            deleted_at: user.deleted_at ? moment(user.deleted_at).format('L') : '',
            email: user.email,
            delet_button: user.deleted_at || user.isadmin === 1 ? '' : renderButtonDelete(user)
        }
    ));

    //---------------/table users-------------//

    //---------------table posts-------------//

    const columns2 = [
        { field: 'idpost', headerName: 'Id post', width: 80 },
        { field: 'post', headerName: 'Contenu du post', width: 400 },
        { field: 'idAuthor', headerName: 'Id auteur', width: 80 },
        { field: 'pseudo', headerName: 'Pseudo de l\'auteur', width: 200 },
        {
            field: 'delet_button', headerName: 'Supprimer post', width: 130, renderCell: (val) => {
                return val.row.delet_button;
            }
        }
    ];

    let rows2 = dataPosts.map((post) => (
        {
            idpost: post.idpost,
            post: post.post,
            idAuthor: post.idAuthor,
            pseudo: post.pseudo,
            delet_button: renderButtonDelete(post)
        }
    ));
    //---------------/table posts-------------//

    //---------------render posts in admin -------------//

    const renderPosts = () => {

        setusersIsEmpty(true);
        setData([]);

        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        let limit = 50;

        const axiosGet = async () => {
            const reponse = axios.get('http://localhost:3000/api/post/all/' + userId + '/' + limit, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            setDataPosts((await reponse).data);
            setpostIsEmpty(false);
        };
        axiosGet();
    };

    //---------------- render --------------//

    return (
        <div>
            <Button variant="text" color='error' startIcon={<EditIcon />} onClick={handleClickOpen}>
                Gestion ADMIN
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {((postsIsEmpty && usersIsEmpty) && 'GESTION ADMIN') || (postsIsEmpty && 'Gerer les utilisateurs') || (usersIsEmpty && 'Gerer les posts')}
                </BootstrapDialogTitle>
                {usersIsEmpty && <Button onClick={renderUsers}>Afficher les utilisateurs</Button>}
                {postsIsEmpty && <Button onClick={renderPosts}>Afficher les posts</Button>}
                <DialogContent dividers>
                    {data.length !== 0 &&
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                getRowId={(row) => row.userId}
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            />
                        </div>}

                    {dataPosts.length !== 0 && <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            getRowId={(row) => row.idpost}
                            rows={rows2}
                            columns={columns2}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </div>}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}





