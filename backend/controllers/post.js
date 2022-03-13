const connexion = require('../config/bdd.js');
const fs = require("fs");

//---------middleware post pour créer 1 post ----------//

exports.createPost = (req, res, next) => {
    
    let post = req.body.post;
    let userId = req.body.userId;
    let imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '' ;
    

    let sql='INSERT INTO posts (post, imageUrl, idAuthor) VALUES (\'' + post + '\', \'' + imageUrl + '\', \'' + userId + '\' )';
    
    connexion.query(sql, (err, results, fields)=>{
        if(err)console.log("Echec d'enregistrement à BD", err);
        else{
            res.status(200).json({message: "post créé !"});
        }
    });
  };

  //---------middleware post pour récupérer tous les posts ----------//

  exports.getAllPosts = (req, res, next) => {

    let sql=`SELECT * FROM testdb.posts LEFT JOIN testdb.users ON testdb.posts.idAuthor = testdb.users.userId ORDER BY idpost DESC`;

    connexion.query(sql, (err, results, fields) => {
        if(err)console.log("Echec d'enregistrement à BD", err);
        else{
            res.status(200).json(results);
        }
    })
  };

  //---------middleware post pour supprimer 1 post  ----------//

  exports.deletPost = (req, res, next) => {

    let idpost = req.params.idpost;

    let sql = 'DELETE FROM testdb.posts WHERE idpost=' + idpost ;

    connexion.query(sql, (err, results, fields) => {
        if(err)console.log("Echec de suppréssion en BD", err);
        else{
            if (req.body.url.length > 0) {
                const filename = req.body.url.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    res.status(200).json({ message: 'post supprimé !'})
                });
            }
            else {
                res.status(200).json({ message: 'post supprimé !'})
            }
            
        }
    })
  };

  //---------middleware post pour get les commentaires  ----------//

  exports.getComments = (req, res, next) => {

    let idpost = req.params.idpost;
    let sql =  'SELECT * FROM comment INNER JOIN posts ON posts.idpost = comment.idPost WHERE posts.idpost = '+idpost+'' ;
    connexion.query(sql, (err, results, fields) => {
        if(err)console.log("Echec BD", err);
        else{
            const result = Object.values(JSON.parse(JSON.stringify(results)));
            res.status(200).send(result)
        }
    })
  };
  