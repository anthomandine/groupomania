import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';




const PostView = () => {

    const pseudo = sessionStorage.getItem('user');
    
    const[posts, setPosts] = useState([]);

    useEffect(() =>{
        const token = sessionStorage.getItem('token');
        const axiosGet = async () => {
            const reponse = await axios.get('http://localhost:3000/api/post/',{
            headers: {
            'Authorization': 'Bearer ' + token
            }
          });
          setPosts(reponse.data);
        };
        axiosGet();
    }, []); 


    const handleDelete = (idpost, imageUrl) => {
        const token = sessionStorage.getItem('token');
        const url = imageUrl;

        axios({
            method: 'delete',
            url: 'http://localhost:3000/api/post/' + idpost,
            headers: {
                'Authorization': 'Bearer ' + token
              },
            data: {url}
            })
            .then(function (reponse) {
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
        };

      
    return (
        <>
            {posts.map((post, index) => (
                <div className='post-view' key={index}>
                    <div className='delete-button'>
                        <IconButton aria-label="delete" size="large" onClick={() => handleDelete(post.idpost, post.imageUrl)} >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <p>{pseudo} à posté : </p>

                    {post.imageUrl.length > 0 &&
                        <img src={post.imageUrl} alt={'image post n:'+ post.idpost}/>}
                    <p className='text-color-3'>{post.post}</p>
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
                ))}
        </>
    );








    /*
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
                <p className='text-color-3'>{posts.map(post => (<span key={post.idpost}>{post.post}</span>))}</p>
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
    );*/
};

export default PostView;