import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import axios from 'axios';


const PostAddView = () => {

    const [ data, setData ] = useState ({ 
        post: ''
    });
    
    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            post: data.post
        };
        const token = sessionStorage.getItem('token');

        axios({
            method: 'post',
            url: 'http://localhost:3000/api/post',
            data: userData,
            headers: {
                'Authorization': 'Bearer ' + token
              }
        })
        .then(function (reponse) {
            console.log('front post coucou');
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
                        name='post' 
                        multiline maxRows={6} fullWidth
                        onChange={handleChange}
                        value={data.post}
                    >
                    </TextField>
                    <div className='add-img'>
                        <Button><AddIcon />Ajouter une image</Button>
                    </div>
                    <Button type='submit'>Publier</Button>
                </form>
            </div>
    );
};

export default PostAddView;