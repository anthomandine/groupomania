import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, TextField } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';




const PostView = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const axiosGet = async () => {
            const reponse = await axios.get('http://localhost:3000/api/post/', {
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
            data: { url }
        })
            .then(function (reponse) {
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
    };



    const [addComment, setAddComment] = useState();
    const [data, setData] = useState({ comment: '' });

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };


    const handleAddComment = (idpost) => {
        let idAuthor = sessionStorage.getItem('userId');
        const commentData = {
            comment: data.comment,
            idpost: idpost,
            idAuthor: idAuthor
        };
        const token = sessionStorage.getItem('token');

        axios({
            method: 'post',
            url: 'http://localhost:3000/api/comment',
            data: commentData,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (reponse) {
                console.log("commentaire envoyer");
            })
            .catch(function (erreur) {
                console.log(erreur);
            });
        setAddComment('');
    };

    const [viewComment, setViewComment] = useState();
    const [isLoading, setLoading] = useState(true);
    const [display, setDisplay] = useState();

    const renderComments = (idpost) => {
        let token = sessionStorage.getItem('token');
        let comments = [];

        const axiosGet = async () => {
            const reponse = await axios.get('http://localhost:3000/api/post/' + idpost + '/comments', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            comments = reponse.data;
        };
        axiosGet();

        setTimeout(
            () => {
                setLoading(false);
                setViewComment(<>{comments.map((comment, i) => {
                    return <div className='comment_div' key={i}>
                        <p>Commentaire de : {comment.idAuthor}</p>
                        <p>{comment.comment}</p>
                    </div>
                })}</>)
            }, 3000
        );
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
                    <p>{post.pseudo} à posté : </p>

                    {post.imageUrl.length > 0 &&
                        <img src={post.imageUrl} alt={'image post n:' + post.idpost} />}
                    <p className='text-color-3'>{post.post}</p>
                    <div className='post-footer'>
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
                        <Button onClick={() => setAddComment(index)} size="small" endIcon={<MessageIcon />}>Commentaire</Button>
                    </div>
                    <div className='add-comment' key={index} style={{ display: index === addComment ? "flex" : "none" }}>
                        <TextField id="text-comment" label="Écrire votre commentaire"
                            name='comment'
                            multiline maxRows={4} fullWidth
                            onChange={handleChange}
                            value={data.comment}
                        ></TextField>
                        <Button onClick={() => handleAddComment(post.idpost)} size="small">publier votre commentaire</Button>
                    </div>
                    <Button onClick={() => { setLoading(true); renderComments(post.idpost); setDisplay(index); }}>click</Button>
                    <div className='comment' style={{ display: index === display ? "block" : "none" }}>
                        {isLoading ? <CircularProgress /> : viewComment}
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostView;