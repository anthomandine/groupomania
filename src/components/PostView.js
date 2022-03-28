import React, { useEffect, useState } from 'react';
import { Avatar, Button, LinearProgress, Slide, TextField } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';
import LikeComponent from './LikeComponent';

const PostView = () => {

    //---------Init variables----------//

    const [posts, setPosts] = useState([]);
    const [addComment, setAddComment] = useState();
    const [data, setData] = useState({ comment: '' });
    const [viewComments, setViewComments] = useState([]);

    const userId = localStorage.getItem('userId');

    //--------------Récupération des posts------------------//

    useEffect(() => {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        const axiosGet = async () => {
            const reponse = await axios.get('http://localhost:3000/api/post/' + userId, {
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
        let token = localStorage.getItem('token');
        let url = imageUrl;

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
        let idAuthor = localStorage.getItem('userId');
        let pseudoAuthor = localStorage.getItem('user');
        const commentData = {
            comment: data.comment,
            idpost: idpost,
            idAuthor: idAuthor,
            pseudoAuthor: pseudoAuthor
        };
        let token = localStorage.getItem('token');

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
        let token = localStorage.getItem('token');

        axios({
            method: 'delete',
            url: 'http://localhost:3000/api/comment/' + idcomment,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (reponse) {
                console.log("commentaire supprimé");
                //window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    //--------------Récupération des commentaires------------------//

    const renderComments = (idpost) => {
        let token = localStorage.getItem('token');
        let comments = [];

        viewComments[idpost] = <div className='comment'><LinearProgress /></div>;
        setViewComments([...viewComments]);

        const axiosGet = async () => {
            const reponse = axios.get('http://localhost:3000/api/post/' + idpost + '/comments', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            comments = (await reponse).data;
            if (comments.length === 0) {
                viewComments[idpost] = <div className='comment'><p className='no-comment'>Aucun commentaire pour ce post !</p></div>;
            }
            else {
                viewComments[idpost] =
                    <div className='comment'>
                        <Slide direction='up' timeout={500} in={true}>
                            <div>{comments.map((comment, i) => {
                                return <div className='comment_div' key={i}>
                                    {comment.userId === parseInt(userId) && <div className='delete-button-comment'>
                                        <IconButton aria-label="delete" size="small" onClick={() => handleDeleteComment(comment.idcomment)} >
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>}
                                    <div className='author'>
                                        <Avatar alt="avatar" src={comment.avatar} sx={{ width: 40, height: 40 }} />
                                        <p>Le {renderDate(comment.com_created_at)}, {comment.pseudo} à commenté :</p>
                                    </div>
                                    <p>{comment.comment}</p>
                                </div>
                            })}</div>
                        </Slide>
                    </div>
            }
            setViewComments([...viewComments]);
        };
        axiosGet();
    };

    const hiddenComments = (idpost) => {
        delete viewComments[idpost];
        setViewComments([...viewComments]);
    };

    const renderDate = (date) => {
        let formatDate = date.split('T')[0].split("-").reverse().join("/");
        //let hour = date.split('T')[1].split("", 5).join("");
        return <span>{formatDate}</span>
    };

    return (
        <>
            {posts.map((post, index) => (
                <div className='post-view' key={index}>
                    {post.idAuthor === parseInt(userId) && <div className='delete-button-post'>
                        <IconButton aria-label="delete" size="large" onClick={() => handleDeletePost(post.idpost, post.imageUrl)} >
                            <DeleteIcon />
                        </IconButton>
                    </div>}
                    <p>Le {renderDate(post.created_at)} {post.pseudo} à posté : </p>
                    {post.imageUrl.length > 0 &&
                        <img className='post-img' src={post.imageUrl} alt={'image post n:' + post.idpost} />}
                    <p className='text-color-3'>{post.post}</p>
                    <div className='post-footer'>
                        <LikeComponent idpost={post.idpost} isLiked={post.islike} />
                        <Button onClick={() => setAddComment(index)} size="small" endIcon={<MessageIcon />}>Ajouter un Commentaire</Button>
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
                    <Button onClick={() => {
                        viewComments[post.idpost] ? hiddenComments(post.idpost) : renderComments(post.idpost)
                    }}>
                        {viewComments[post.idpost] ? 'Masquer les commentaires' : 'Afficher les commentaires'}
                    </Button>
                    {viewComments[post.idpost]}
                </div>
            ))}
        </>
    );
};

export default PostView;