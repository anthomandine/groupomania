
//-------- Initialisation express et routeur ---------//


const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');

//--------Chargement des routes vers middleware---------//

router.post('/', auth,  postCtrl.createPost);

router.get('/', auth, postCtrl.getAllPosts);


module.exports = router;