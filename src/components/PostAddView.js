import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import axios from 'axios';
import { validPost } from '../components/Regex';

const PostAddView = () => {

    //---------Init variables----------//

    const [data, setData] = useState({ post: '', image: '', userId: '' });
    const [postError, setPostError] = useState(false);

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
        let preview = document.getElementById('preview');
        preview.style.display = "inline";
        preview.src = window.URL.createObjectURL(file);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            'post': value,
        });
    };

    //---------Fonction envoi des données post ------------------//

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const form = new FormData();
        form.append('post', data.post);
        form.append('image', data.image);
        form.append('userId', userId);

        axios({
            method: 'post',
            url: 'http://localhost:3000/api/post',
            data: form,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (reponse) {
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    return (
        <div className='post-add-text'>
            <form method="post" onSubmit={handleSubmit}>
                <p>Ajouter un post:</p>
                <TextField id="text-post" label="Écrire votre post"
                    helperText={postError ?'Post non valide' : ""}
                    name='post'
                    multiline maxRows={6} fullWidth
                    onChange={handleChange}
                    value={data.post}
                >
                </TextField>
                <div className='add-img'>
                    <label>
                        <Button component="span">
                            <AddIcon />Ajouter une image
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={handleChangeImg}
                            />
                        </Button>
                    </label>
                    <img id="preview" alt="apercu" />
                </div>
                <Button type='submit' onClick={validate}>Publier</Button>
            </form>
        </div>
    );
};

export default PostAddView;