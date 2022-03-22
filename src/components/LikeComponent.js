import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { IconButton } from '@mui/material';
import axios from 'axios';


const LikeComponent = (props) => {


    const [state, setState] = useState({
        likeActive: props.isLiked === 1,
        dislikeActive: props.isLiked === 0
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
        let idpost = props.idpost;
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
                window.location.reload();
            })
            .catch(function (erreur) {
                console.log('err post like front', erreur);
            })
    };

    const [sumlike, setSumlike] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        let idpost = props.idpost;
        const axiosGet = async () => {
            const reponse = await axios.get('http://localhost:3000/api/post/'+idpost+'/sumlike', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            setSumlike(reponse.data[0]);
        };
        axiosGet();
        // eslint-disable-next-line
    }, []);


    const renderSumLike = () => {
        return <span className='count-like'>{sumlike.liked}</span>
    }

    const renderSumDislike = () => {
        return <span className='count-like'>{sumlike.disliked}</span>
    }



    return (
        <div>
            <IconButton aria-label="like" size="small" onClick={() => handleLike()}>
                <ThumbUpIcon color={state.likeActive ? 'primary' : 'default'} />
            </IconButton>
            {renderSumLike()}
            <IconButton aria-label="dislike" size="small" onClick={() => handleDislike()}>
                <ThumbDownAltIcon color={state.dislikeActive ? 'error' : 'default'} />
            </IconButton>
            {renderSumDislike()}
        </div>
    );
};

export default LikeComponent;