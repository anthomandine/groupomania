import React/*, { useState }*/ from 'react';
import { Button } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
//import axios from 'axios';

const PostView = () => {

    const pseudo = sessionStorage.getItem('user');
    
    
    /*
    const token = sessionStorage.getItem('token');

    const[results, setResults] = useState([]);

    

        axios.get('http://localhost:3000/api/post/',
    {
        headers: {
        'Authorization': 'Bearer ' + token
    }
      })
    .then((reponse) => {
        
        setResults(reponse.data);     
        });
console.log(results);


*/

    
    return (
        <>
            <div className='post-view'>
                <div className='delete-button'>
                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon />
                    </IconButton>
                </div>
                <p>{pseudo} à posté : </p>
                <img src='' alt='' />
                <p className='text-color-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <div className='add-comment'>
                    <div>
                        <IconButton aria-label="like" size="small">
                            <span className='count-like'>0</span>
                            <ThumbUpIcon />
                        </IconButton>
                        <IconButton aria-label="like" size="small">
                            <span className='count-like'>0</span>
                            <ThumbDownAltIcon />
                        </IconButton>
                    </div>
                    <Button size="small" endIcon={<MessageIcon />}>Commentaire</Button>
                </div>
            </div>

            <div className='post-view'>
                <div className='delete-button'>
                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon />
                    </IconButton>
                </div>
                <p>{pseudo} à posté : </p>
                <img src='' alt='' />
                <p className='text-color-3'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <div className='add-comment'>
                    <div>
                        <IconButton aria-label="like" size="small">
                            <span className='count-like'>0</span>
                            <ThumbUpIcon />
                        </IconButton>
                        <IconButton aria-label="like" size="small">
                            <span className='count-like'>0</span>
                            <ThumbDownAltIcon />
                        </IconButton>
                    </div>
                    <Button size="small" endIcon={<MessageIcon />}>Commentaire</Button>
                </div>
                <div className='comment'>
                    <p>Commentaire de : {pseudo}</p>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum</p>
                </div>
                <div className='comment'>
                    <p>Commentaire de : {pseudo}</p>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum</p>
                </div>
            </div>
    </>
    );
};

export default PostView;