
//-------- Initialisation express et routeur ---------//


const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//--------Chargement des routes vers middleware---------//

router.post('/', auth, multer,  postCtrl.createPost);

router.get('/', auth, multer, postCtrl.getAllPosts);

router.delete('/:idpost', auth, multer, postCtrl.deletPost);


module.exports = router;