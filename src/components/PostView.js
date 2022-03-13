import React, { useEffect, useState } from 'react';
import { Button, LinearProgress, TextField } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';




const PostView = () => {

    //---------Init variables----------//

    const [posts, setPosts] = useState([]);
    const [addComment, setAddComment] = useState();
    const [data, setData] = useState({ comment: '' });
    const [viewComment, setViewComment] = useState();
    const [isLoading, setLoading] = useState(true);
    const [display, setDisplay] = useState();



    //--------------Récupération des posts------------------//

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


    //--------------Fonction delete post------------------//


    const handleDeletePost = (idpost, imageUrl) => {
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


    //--------------Fonction récupération input commentaire------------------//



    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value,
        });
    };

    //--------------Ajout des commentaires------------------//



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

     //--------------Fonction delete commentaire------------------//


     const handleDeleteComment = (idcomment) => {
        const token = sessionStorage.getItem('token');

        axios({
            method: 'delete',
            url: 'http://localhost:3000/api/comment/' + idcomment,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (reponse) {
                console.log("commentaire supprimé");
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    //--------------Récupération des commentaires------------------//



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
                        <div className='delete-button-comment'>
                            <IconButton aria-label="delete" size="small" onClick={() => handleDeleteComment(comment.idcomment)} >
                                <DeleteIcon />
                            </IconButton>
                        </div>
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
                    <div className='delete-button-post'>
                        <IconButton aria-label="delete" size="large" onClick={() => handleDeletePost(post.idpost, post.imageUrl)} >
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
                    <Button onClick={() => { setLoading(true); renderComments(post.idpost); setDisplay(index); }}>voir les commentaires</Button>
                    <div className='comment' style={{ display: index === display ? "block" : "none" }}>
                        {isLoading ? <LinearProgress /> : viewComment}
                    </div>
                </div>
            ))}
        </>
    );
};

export default PostView;