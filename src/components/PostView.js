import React, { useEffect, useState } from 'react';
import { Avatar, Button, LinearProgress, Slide, TextField } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';
import LikeComponent from './LikeComponent';
import moment from 'moment';
import "moment/locale/fr";
import { validComment } from '../components/Regex';


const PostView = () => {

    //---------Init variables----------//

    const [posts, setPosts] = useState([]);
    const [addComment, setAddComment] = useState();
    const [data, setData] = useState({ comment: '' });
    const [viewComments, setViewComments] = useState([]);

    const userId = localStorage.getItem('userId');
    const isadmin = localStorage.getItem('isadmin');

    const [commentErr, setCommentErr] = useState(false);
    const [limit, setLimit] = useState(5);

    //--------------Récupération des posts 5 par 5------------------//

    useEffect(() => {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        const axiosGet = async () => {

            const reponse = axios.get('http://localhost:3000/api/post/all/' + userId + '/' + limit, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            setPosts((await reponse).data);
        };
        axiosGet();
    }, [limit]);

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

        //---------Verification Regex----------//
        if (!validComment.test(data.comment)) {
            setCommentErr(true);
        }
        else {

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
        }
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
                window.location.reload();
            })
            .catch(function (err) {
                console.log(err);
            });
    };

    //--------------Récupération des commentaires------------------//

    const renderComments = (idpost) => {
        let token = localStorage.getItem('token');
        let comments = [];

        viewComments[idpost] = {
            render: <div className='comment'><LinearProgress /></div>,
            isShow: true
        };
        setViewComments([...viewComments]);

        const axiosGet = async () => {
            const reponse = axios.get('http://localhost:3000/api/post/' + idpost + '/comments', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            comments = (await reponse).data;
            if (comments.length === 0) {
                viewComments[idpost] = {
                    render:
                        <p className='no-comment'>Aucun commentaire pour ce post !</p>,
                    isShow: true
                }
            }
            else {
                viewComments[idpost] = {
                    render:
                        <div>{comments.map((comment, i) => {
                            return <div className='comment_div' key={i}>
                                {(comment.userId === parseInt(userId) || parseInt(isadmin) === 1) && <div className='delete-button-comment'>
                                    <IconButton aria-label="delete" size="small" onClick={() => handleDeleteComment(comment.idcomment)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>}
                                <div className='author'>
                                    <Avatar alt="avatar" src={comment.avatar} sx={{ width: 40, height: 40 }} />
                                    <p>{renderDate(comment.com_created_at)}, {comment.pseudo} à commenté :</p>
                                </div>
                                <p>{comment.comment}</p>
                            </div>
                        })}</div>,
                    isShow: true
                }
            }
            setViewComments([...viewComments]);
        };
        axiosGet();
    };

    const hiddenComments = (idpost) => {

        viewComments[idpost].isShow = false;
        setViewComments([...viewComments]);

        setTimeout(() => {
            delete viewComments[idpost];
            setViewComments([...viewComments]);
        }, 400);
    };

    const renderDate = (date) => {
        let formatDate = moment(date);
        return <span>{formatDate.calendar()}</span>
    };

    return (
        <>
            {posts.map((post, index) => (
                <div className='post-view' key={index}>
                    {(post.idAuthor === parseInt(userId) || parseInt(isadmin) === 1) && <div className='delete-button-post'>
                        <IconButton aria-label="delete" size="large" onClick={() => handleDeletePost(post.idpost, post.imageUrl)} >
                            <DeleteIcon />
                        </IconButton>
                    </div>}
                    <p>{renderDate(post.created_at)} {post.pseudo} à posté : </p>
                    {post.imageUrl.length > 0 &&
                        <img className='post-img' src={post.imageUrl} alt={'image post n:' + post.idpost} />}
                    <p className='text-color-3'>{post.post}</p>
                    <div className='post-footer'>
                        <LikeComponent idpost={post.idpost} isLiked={post.islike} />
                        <Button onClick={() => setAddComment(index)} size="small" endIcon={<MessageIcon />}>Ajouter un Commentaire</Button>
                    </div>
                    <div className='add-comment' key={index} style={{ display: index === addComment ? "flex" : "none" }}>
                        <TextField id="text-comment" label="Écrire votre commentaire"
                            helperText={commentErr ? 'commentaire non valide' : ''}
                            name='comment'
                            multiline maxRows={4} fullWidth
                            onChange={handleChange}
                            value={data.comment}
                            error={commentErr}
                        ></TextField>
                        <Button onClick={() => handleAddComment(post.idpost)} size="small">publier votre commentaire</Button>
                    </div>
                    <Button onClick={() => {
                        viewComments[post.idpost] ? hiddenComments(post.idpost) : renderComments(post.idpost)
                    }}>
                        {viewComments[post.idpost] ? 'Masquer les commentaires' : 'Afficher les commentaires'}
                    </Button>
                    <div style={{ overflow: 'hidden', width: '85%' }}>
                        <Slide direction='down' timeout={800} in={(viewComments[post.idpost] && viewComments[post.idpost].isShow)}>
                            <div className='comment'>
                                {viewComments[post.idpost] && viewComments[post.idpost].render}
                            </div>
                        </Slide>
                    </div>
                </div>
            ))}
            <div className='renderPostButton'>
                <button onClick={() => setLimit(limit + 5)}>
                    (Afficher 5 autres posts)
                </button>
            </div>
        </>
    );
};

export default PostView;