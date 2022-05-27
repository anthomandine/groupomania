import React, { useEffect, useRef, useState } from 'react';
import { Alert, Avatar, Button, LinearProgress, Slide, TextField } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';
import LikeComponent from './LikeComponent';
import moment from 'moment';
import "moment/locale/fr";
import { validComment } from '../components/Regex';
import swal from 'sweetalert';
import { URL } from '../App';

//---------Init variables limit sql posts et commentaires----------//

let lazy = { limit: 5, stop: false };
let lazyComment = { limit: 5, stop: false };

const PostView = (props) => {

    //---------Init variables----------//
    const [posts, setPosts] = useState([]);
    const [addComment, setAddComment] = useState();
    const [data, setData] = useState({ comment: '' });
    const [viewComments, setViewComments] = useState([]);
    const userId = localStorage.getItem('userId');
    const isadmin = localStorage.getItem('isadmin');
    const [commentErr, setCommentErr] = useState(false);
    const [limit, setLimit] = useState(lazy.limit);
    const postsContent = useRef(null);
    const [success, setSuccess] = useState(false);


    //--------------Récupération des posts 5 par 5------------------//

    useEffect(() => {
        let token = localStorage.getItem('token');
        let userId = localStorage.getItem('userId');
        const axiosGet = async () => {

            const reponse = axios.get(URL + '/api/post/' + userId + '/' + limit + '/posts', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            let data = (await reponse).data;
            lazy.stop = ((posts.length === data.length) && !(Number.isInteger(data.length / 5)));
            setPosts((await reponse).data);
        };
        axiosGet();
        // eslint-disable-next-line
    }, [limit, props.isload]);

    //--------------Fonction delete post------------------//

    const handleDeletePost = (idpost, imageUrl) => {

        swal({
            title: "Etes vous sure de vouloir supprimer ce post ?",
            text: "La suppression sera définitive !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Le post à été supprimer!", {
                        icon: "success",
                    });
                    let token = localStorage.getItem('token');
                    let url = imageUrl;

                    axios({
                        method: 'delete',
                        url: URL + '/api/post/' + idpost,
                        headers: {
                            'Authorization': 'Bearer ' + token
                        },
                        data: { url }
                    })
                        .then(function (reponse) {
                            setSuccess(true);
                            setTimeout(() => {
                                setSuccess(false);
                                props.isLoadF();
                            }, 1200);
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                } else {
                    swal("Action Annulé !", {
                        icon: "error",
                    });
                }
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
        if (validComment.test(data.comment)) {
            axios({
                method: 'post',
                url: URL + '/api/comment',
                data: commentData,
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(function (reponse) {
                    console.log("commentaire envoyer");
                    renderComments(idpost);
                })
                .catch(function (erreur) {
                    console.log(erreur);
                });
            setAddComment('');
        }
        else {

            setCommentErr(true);
            return;
        }
    };

    //--------------Fonction delete commentaire------------------//

    const handleDeleteComment = (idcomment, idpost) => {

        swal({
            title: "Etes vous sure de vouloir supprimer ce commentaire ?",
            text: "La suppression sera définitive !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Le commentaire à été supprimer!", {
                        icon: "success",
                    });
                    let token = localStorage.getItem('token');
                    axios({
                        method: 'delete',
                        url: URL + '/api/comment/' + idcomment,
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    })
                        .then(function (reponse) {
                            console.log("commentaire supprimé");
                            renderComments(idpost);
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                } else {
                    swal("Action Annulé !", {
                        icon: "error",
                    });
                }
            });
    };

    //--------------fonction limit des commentaires------------------//

    const limitComments = (idpost) => {
        if (lazyComment.stop) return;
        lazyComment.limit += 5;
        renderComments(idpost);
    };

    //--------------fonction affichage des commentaires------------------//

    const renderComments = (idpost) => {
        let token = localStorage.getItem('token');
        let comments = [];

        viewComments[idpost] = {
            render: <div className='comment'><LinearProgress /></div>,
            isShow: true,
            isEmpty: true
        };
        setViewComments([...viewComments]);

        const axiosGet = async () => {
            const reponse = axios.get(URL + '/api/post/' + idpost + '/' + lazyComment.limit + '/comments', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            comments = (await reponse).data;
            lazyComment.stop = !(Number.isInteger(comments.length / 5));
            if (comments.length === 0) {
                viewComments[idpost] = {
                    render:
                        <p className='no-comment'>Aucun commentaire pour ce post !</p>,
                    isShow: true,
                    isEmpty: true
                }
            }
            else {
                viewComments[idpost] = {
                    render:
                        <div>{comments.map((comment, i) => {
                            return <div className='comment_div' key={i}>
                                {(comment.id_user === parseInt(userId) || parseInt(isadmin) === 1) && <div className='delete-button-comment'>
                                    <IconButton aria-label="delete" size="small" onClick={() => handleDeleteComment(comment.id, idpost)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>}
                                <div className='author'>
                                    <Avatar alt="avatar" src={comment.avatar} sx={{ width: 40, height: 40 }} />
                                    <p>{renderDate(comment.created_at)}, {comment.pseudo} à commenté :</p>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        })}
                            {!lazyComment.stop && <div className='more-comment'>
                                {viewComments[idpost].isEmpty ? <p onClick={() => limitComments(idpost)} style={{ textAlign: 'center', cursor: 'pointer' }}> (Voir plus)</p> : ''}
                            </div>}

                        </div>,
                    isShow: true,
                    isEmpty: false
                }
            }
            setViewComments([...viewComments]);
        };
        axiosGet();
    };

    //--------------fonction cacher les commentaires------------------//

    const hiddenComments = (idpost) => {

        viewComments[idpost].isShow = false;
        setViewComments([...viewComments]);

        setTimeout(() => {
            delete viewComments[idpost];
            setViewComments([...viewComments]);
        }, 400);
    };

    //--------------Fonction d'affichage de la date en francais--------//

    const renderDate = (date) => {
        let formatDate = moment(date);
        return <span>{formatDate.calendar()}</span>
    };

    //--------------Fonction limit pour la requete des posts au scroll------------------//

    const handleScroll = () => {
        if (lazy.stop) return;

        let contentWidth = postsContent.current.scrollHeight;
        let scrollY = window.pageYOffset;

        if (contentWidth < (scrollY + (scrollY / 3))) {
            lazy.limit += 5;
            lazy.stop = true;
            setLimit(lazy.limit);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    }, []);

    //--------------render/return viewpost------------------//
    return (
        <div ref={postsContent}>
            {success && <div className='delet-success'><Alert severity="success">Post supprimé !</Alert></div>}
            {posts.map((post, index) => (
                <div className='post-view' key={index}>
                    <Avatar alt="avatar" src={post.avatar} sx={{ width: 40, height: 40 }}></Avatar>
                    {(post.id_user === parseInt(userId) || parseInt(isadmin) === 1) && <div className='delete-button-post'>
                        <IconButton aria-label="delete" size="large" onClick={() => handleDeletePost(post.id, post.imageUrl)} >
                            <DeleteIcon />
                        </IconButton>
                    </div>}

                    <p>{renderDate(post.created_at)} {post.pseudo} à posté : </p>

                    {(post.imageUrl.length > 0) &&
                        (post.imageUrl.split('.')[post.imageUrl.split('.').length - 1] === 'pdf' ?
                            <object type="application/pdf" data={post.imageUrl} aria-label='pdf'></object> :
                            <img className='post-img' src={post.imageUrl} alt={'image post n:' + post.id}
                            />)}
                    <p className='text-color-3'>{post.text}</p>
                    {(post.lienUrl && post.lienUrl !== 'null') &&
                        //<object type="application/pdf" data={post.lienUrl} aria-label='pdf'></object>
                        <embed className='video' src={`https://www.youtube.com/embed/${post.lienUrl}`} allowFullScreen></embed>
                    }
                    <div className='post-footer'>
                        <LikeComponent
                            idpost={post.id}
                            liked={post.liked}
                            disliked={post.disliked}
                            id_user={post.id_user}
                            islikeactive={post.islikeactive}
                        />
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
                        <Button onClick={() => handleAddComment(post.id)} size="small">publier votre commentaire</Button>
                    </div>
                    <Button onClick={() => {
                        viewComments[post.id] ? hiddenComments(post.id) : renderComments(post.id)
                    }}>
                        {viewComments[post.id] ? 'Masquer les commentaires' : 'Afficher les commentaires'}
                    </Button>
                    <div className='comment-content'>
                        <Slide direction='down' timeout={800} in={(viewComments[post.id] && viewComments[post.id].isShow)}>
                            <div className='comment'>
                                {viewComments[post.id] && viewComments[post.id].render}
                            </div>
                        </Slide>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostView;