import React from 'react';
import { Button } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

const PostView = () => {
    return (
        <>
            <div className='post-view'>
                <div className='delete-button'>
                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon />
                    </IconButton>
                </div>
                <p>"Pseudo du post"</p>
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
            </div>

            <div className='post-view'>
                <div className='delete-button'>
                    <IconButton aria-label="delete" size="large">
                        <DeleteIcon />
                    </IconButton>
                </div>
                <p>"Pseudo du post"</p>
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
                    <p>"pseudo commentaire"</p>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum</p>
                </div>
                <div className='comment'>
                    <p>"pseudo commentaire"</p>
                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum</p>
                </div>
            </div>
    </>
    );
};

export default PostView;