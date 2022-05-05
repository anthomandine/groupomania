const connexion = require('../config/bdd.js');

//---------middleware post pour créer 1 commentaire ----------//

exports.createComment = (req, res, next) => {

    let comment = req.body.comment;
    let idpost = req.body.idpost;
    let idAuthor = req.body.idAuthor;

    let sql = 'INSERT INTO comment (text, id_post, id_user, created_at) VALUES (?, ' + idpost + ', ' + idAuthor + ',  Now() )';

    connexion.query(sql,comment, (err, results, fields) => {
        if (err) console.log("Echec d'enregistrement à BD", err);
        else {
            return res.status(200).json({ message: "commentaire créé !" });
        }
    });
};

//---------middleware post pour supprimer 1 commentaire  ----------//

exports.deletComment = (req, res, next) => {

    let idcomment = req.params.idcomment;

    let sql = 'DELETE FROM comment c WHERE c.id=' + idcomment;

    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec de suppréssion en BD", err);
        else {
            return res.status(200).json({ message: 'commentaire supprimé !' })
        }
    })
};

