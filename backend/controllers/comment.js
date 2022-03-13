const connexion = require('../config/bdd.js');

//---------middleware post pour créer 1 commentaire ----------//

exports.createComment = (req, res, next) => {
    
    let comment = req.body.comment;
    let idpost = req.body.idpost;
    let idAuthor = req.body.idAuthor;

    let sql='INSERT INTO comment (comment, idpost, idAuthor) VALUES (\'' + comment + '\', \'' + idpost + '\', \'' + idAuthor + '\' )';
    
    connexion.query(sql, (err, results, fields)=>{
        if(err)console.log("Echec d'enregistrement à BD", err);
        else{
            res.status(200).json({message: "commentaire créé !"});
        }
    });
  };

  