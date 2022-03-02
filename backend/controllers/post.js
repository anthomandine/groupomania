const connexion = require('../config/bdd.js');
const fs = require("fs");

//---------middleware post pour créer 1 post ----------//

exports.createPost = (req, res, next) => {
    
    let post = req.body.post;
    let imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '' ;

    let sql='INSERT INTO posts (post, imageUrl) VALUES (\'' + post + '\', \'' + imageUrl + '\')';
    
    connexion.query(sql, (err, results, fields)=>{
        if(err)console.log("Echec d'enregistrement à BD");
        else{
            res.status(200).json({message: "post créé !"});
        }
    });
  };

  //---------middleware post pour récupérer tous les posts ----------//

  exports.getAllPosts = (req, res, next) => {

    let sql=`SELECT * FROM testdb.posts ORDER BY idpost DESC`;

    connexion.query(sql, (err, results, fields) => {
        if(err)console.log("Echec d'enregistrement à BD");
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
        if(err)console.log("Echec de suppréssion en BD");
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
  