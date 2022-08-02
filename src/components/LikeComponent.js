import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { URL } from '../App';

const LikeComponent = (props) => {

    //---------Init variables----------//
    let like = null;
    let [liked, setLiked] = useState();
    let [disliked, setDisliked] = useState();
    const [state, setState] = useState({
        likeActive: '',
        dislikeActive: ''
    });
    
    useEffect(() => {
        setState({
            likeActive: props.islikeactive === 1,
            dislikeActive: props.islikeactive === 0
        });
        setLiked(props.liked);
        setDisliked(props.disliked);
    }, [props]);

    //---------fonction click like----------//

    const handleLike = () => {

        if (state.likeActive) {
            setLiked(liked - 1);
            setState({ likeActive: false, dislikeActive: false });
        }
        else {
            if (state.dislikeActive) { setDisliked(disliked - 1); }
            setLiked(liked + 1);
            setState({ likeActive: true, dislikeActive: false });
            like = true;
        }
        axiosPostLike();
    };

    //---------fonction click dislike----------//

    const handleDislike = () => {

        if (state.dislikeActive) {
            setDisliked(disliked - 1);
            setState({ likeActive: false, dislikeActive: false });
        }
        else {
            if (state.likeActive) { setLiked(liked - 1); };
            setDisliked(disliked + 1);
            setState({ likeActive: false, dislikeActive: true });
            like = false;
        }
        axiosPostLike();
    };

    //---------Fonction envoi des données post pour les likes----------//

    const axiosPostLike = () => {
        let token = localStorage.getItem('token');
        let idpost = props.idpost;
        let userId = localStorage.getItem('userId');
        let data = { userId, like };

        axios({
            method: 'post',
            url: URL + '/api/post/' + idpost + '/like',
            data: [data],
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (reponse) {
                console.log("post like front ok");
            })
            .catch(function (erreur) {
                console.log('err post like front', erreur);
            })
    };

    return (
        <div>
            <IconButton aria-label="like" size="small" onClick={() => handleLike()}>
                <ThumbUpIcon color={state.likeActive ? 'primary' : 'default'} />
            </IconButton>
            <span className='count-like'>{liked ? liked : '0'}</span>
            <IconButton aria-label="dislike" size="small" onClick={() => handleDislike()}>
                <ThumbDownAltIcon color={state.dislikeActive ? 'error' : 'default'} />
            </IconButton>
            <span className='count-like'>{disliked ? disliked : '0'}</span>
        </div>
    );
};

export default LikeComponent;