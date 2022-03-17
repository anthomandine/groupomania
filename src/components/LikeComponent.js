import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { IconButton } from '@mui/material';
import axios from 'axios';


const LikeComponent = (props) => {


    const [state, setState] = useState({
        likeActive: false,
        dislikeActive: false
    });
    let like = null;

    const handleLike = () => {

        if (state.likeActive) {
            setState({ likeActive: false, dislikeActive: false });
        }
        else {
            setState({ likeActive: true, dislikeActive: false });
            like = true;
        }
        axiosPostLike();
    };

    const handleDislike = () => {
        if (state.dislikeActive) {
            setState({ likeActive: false, dislikeActive: false });
        }
        else {
            setState({ likeActive: false, dislikeActive: true });
            like = false;
        }
        axiosPostLike();
    };


    const axiosPostLike = () => {
        let token = sessionStorage.getItem('token');
        let idpost = props.id;
        let userId = sessionStorage.getItem('userId');
        let data = { userId, like };

        axios({
            method: 'post',
            url: 'http://localhost:3000/api/post/' + idpost + '/like',
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
            <span className='count-like'>0</span>
            <IconButton aria-label="dislike" size="small" onClick={() => handleDislike()}>
                <ThumbDownAltIcon color={state.dislikeActive ? 'error' : 'default'} />
            </IconButton>
            <span className='count-like'>0</span>
        </div>
    );
};

export default LikeComponent;