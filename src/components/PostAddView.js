import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

const PostAddView = () => {
    return (
            <div className='post-add-text'>
                <p>Ajouter un post:</p>
                <TextField id="text-post" label="Écrire votre post" 
                    multiline maxRows={6} fullWidth>
                </TextField>
                <div className='add-img'>
                    <Button><AddIcon />Ajouter une image</Button>
                    
                </div>
            </div>
            
    );
};

export default PostAddView;