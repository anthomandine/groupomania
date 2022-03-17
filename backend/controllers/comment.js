const connexion = require('../config/bdd.js');

//---------middleware post pour créer 1 commentaire ----------//

exports.createComment = (req, res, next) => {
    
    let comment = req.body.comment;
    let idpost = req.body.idpost;
    let idAuthor = req.body.idAuthor;
    const formatYmd = date => date.toLocaleDateString();
    let date = formatYmd(new Date());

    let sql='INSERT INTO comment (comment, idpost, idAuthor, created_at) VALUES (\'' + comment + '\', \'' + idpost + '\', \'' + idAuthor + '\', \'' + date + '\')';
    
    connexion.query(sql, (err, results, fields)=>{
        if(err)console.log("Echec d'enregistrement à BD", err);
        else{
            res.status(200).json({message: "commentaire créé !"});
        }
    });
  };

  //---------middleware post pour supprimer 1 commentaire  ----------//

  exports.deletComment = (req, res, next) => {

    let idcomment = req.params.idcomment;

    let sql = 'DELETE FROM comment WHERE idcomment=' + idcomment ;

    connexion.query(sql, (err, results, fields) => {
        if(err)console.log("Echec de suppréssion en BD", err);
        else{
                res.status(200).json({ message: 'commentaire supprimé !'})
        }
    })
  };

  