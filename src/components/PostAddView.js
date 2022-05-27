import { Alert, TextField } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import axios from 'axios';
import { validPost } from '../components/Regex';
import { URL } from '../App';

const PostAddView = (props) => {

    //---------Init variables----------//

    const [data, setData] = useState({ post: '', image: '', userId: '' });
    const [postError, setPostError] = useState(false);
    const [lienError, setLienError] = useState(false);
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false);

    //---------Verification Regex----------//

    const validate = () => {
        if (!validPost.test(data.post)) {
            setPostError(true);
        }
    };

    //---------Récupération des data input post ------------------//

    const handleChangeImg = (e) => {
        const file = e.target.files[0];
        setData({
            ...data,
            'image': file,
        });
        let imgPreview = document.getElementById('preview-img');
        let pdfPreview = document.getElementById('preview-pdf');
        if (file.type.split("/")[0] === 'image') {
            imgPreview.style.display = "inline";
            imgPreview.src = window.URL.createObjectURL(file);
        }
        if (file.type.split("/")[0] === 'application') {
            pdfPreview.style.display = "inline";
            pdfPreview.data = window.URL.createObjectURL(file);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            'post': value,
        });
    };

    const handleChangeLien = (e) => {
        const value = e.target.value;
        const regexp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
        const match = value.match(regexp);
        if (!match) {
            setLienError(true);
            return;
        }
        else {
            setLienError(false);
            setData({
                ...data,
                'lien': match[6],
            });
        }
    };

    //---------Fonction envoi des données post ------------------//

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validPost.test(data.post)) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const form = new FormData();
            form.append('post', data.post);
            form.append('image', data.image);
            form.append('userId', userId);
            if (data.lien) {
                form.append('lien', data.lien);
            }
            else { form.append('lien', null); }

            axios({
                method: 'post',
                url: URL + '/api/post',
                data: form,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(function (reponse) {
                    props.isLoadF();
                    setSuccess(true);
                    setTimeout(() => {
                        setSuccess(false);
                    }, 2000);
                })
                .catch(function (err) {
                    console.log(err);
                    setAlert(true);
                    setTimeout(() => {
                        setAlert(false);
                    }, 2000);
                });
        }
        else {
            return;
        }
    };

    return (
        <div className='post-add-text'>
            <form method="post" onSubmit={handleSubmit}>
                <p>Ajouter un post:</p>
                <TextField id="text-post" label="Écrire votre post"
                    helperText={postError ? 'Post non valide' : ""}
                    name='post'
                    multiline maxRows={6} fullWidth
                    onChange={handleChange}
                    value={data.post}
                    error={postError}
                >
                </TextField>

                <TextField
                    id="lien-post"
                    type={'url'}
                    style={{ marginTop: '10px' }}
                    pattern="https://.*"
                    label="Ajouter un lien youtube"
                    helperText={lienError ? 'Entrer un lien youtube valide' : ''}
                    name='lien'
                    onChange={handleChangeLien}
                    fullWidth
                    error={lienError}
                >
                </TextField>
                <div className='add-img'>
                    <label>
                        <Button component="span">
                            <AddIcon />Ajouter un fichier
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={handleChangeImg}
                            />
                        </Button>
                    </label>
                    <img id='preview-img' alt="apercu" />
                    <object id="preview-pdf" type="application/pdf" aria-label='pdf'></object>
                </div>
                <Button type='submit' onClick={validate}>Publier</Button>
                {alert && <Alert severity="error">Erreur Post</Alert>}
                {success && <Alert severity="success">Post publié !</Alert>}
            </form>
        </div>
    );
};

export default PostAddView;