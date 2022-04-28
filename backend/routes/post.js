
//-------- Initialisation express et routeur ---------//

const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//--------Chargement des routes vers middleware---------//

router.post('/', auth, multer, postCtrl.createPost);

router.get('/all/:userId/:limit', auth, multer, postCtrl.getAllPosts);

router.delete('/:idpost', auth, multer, postCtrl.deletPost);

router.get('/:idpost/:limit/comments', auth, postCtrl.getComments);

router.post('/:idpost/like', auth, postCtrl.likePost);

router.get('/:idpost/like/:userId', auth, postCtrl.getLike);

module.exports = router;