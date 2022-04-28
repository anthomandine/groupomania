import React, { useEffect, useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { IconButton } from '@mui/material';
import axios from 'axios';

const LikeComponent = (props) => {
    //---------Init variables----------//

    const [state, setState] = useState({
        likeActive: props.isLiked === 1,
        dislikeActive: props.isLiked === 0
    });
    let like = null;
    const [sumlike, setSumlike] = useState([]);

    //---------fonction click like----------//

    const handleLike = () => {
        
        if (state.likeActive) {
            sumlike.liked -- ;
            setState({ likeActive: false, dislikeActive: false });
        }
        else {
            if (state.dislikeActive) { sumlike.disliked -- ; }
            sumlike.liked ++ ;
            setState({ likeActive: true, dislikeActive: false });
            like = true;
        }
        axiosPostLike();
    };

    //---------fonction click dislike----------//

    const handleDislike = () => {
        if (state.dislikeActive) {
            sumlike.disliked -- ;
            setState({ likeActive: false, dislikeActive: false });
        }
        else {
            if (state.likeActive) { sumlike.liked -- ; };
            sumlike.disliked ++ ;
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

    //---------Récupération des données somme des likes et dislikes par post----------//

    useEffect(() => {
        const token = localStorage.getItem('token');
        let idpost = props.idpost;
        const axiosGet = async () => {
            const reponse = await axios.get('http://localhost:3000/api/post/' + idpost + '/sumlike', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            setSumlike(reponse.data[0]);
        };
        axiosGet();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <IconButton aria-label="like" size="small" onClick={() => handleLike()}>
                <ThumbUpIcon color={state.likeActive ? 'primary' : 'default'} />
            </IconButton>
            <span className='count-like'>{sumlike.liked ? sumlike.liked : '0' }</span>
            <IconButton aria-label="dislike" size="small" onClick={() => handleDislike()}>
                <ThumbDownAltIcon color={state.dislikeActive ? 'error' : 'default'} />
            </IconButton>
            <span className='count-like'>{sumlike.disliked ? sumlike.disliked : '0'}</span>
        </div>
    );
};

export default LikeComponent;