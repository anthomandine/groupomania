const multer = require('multer');
const fs = require("fs");

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif',
  'application/pdf': 'pdf'
};

//let folder = '/home/asanna/www/groupomania/backend/images';
let folder = './images';
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //callback(null, '/home/asanna/www/groupomania/backend/images');
    callback(null, './images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
module.exports = multer({storage: storage}).single('image');


//bash: npm install multer