const connexion = require('../config/bdd.js');
const fs = require("fs");

//---------middleware post pour créer 1 post ----------//

exports.createPost = (req, res, next) => {

    let post = req.body.post;
    let userId = req.body.userId;
    let imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '';

    let sql = 'INSERT INTO post (text, imageUrl, id_user, created_at) VALUES (\'' + post + '\', \'' + imageUrl + '\', \'' + userId + '\', Now() )';
    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec d'enregistrement à BD", err);
        else {
            return res.status(200).json({ message: "post créé !" });
        }
    });
};

//---------middleware post pour récupérer tous les posts ----------//

exports.getAllPosts = (req, res, next) => {

    //let userId = req.params.userId;
    let limit = req.params.limit;

    let sql = 'SELECT p.id, p.text, p.imageUrl, p.id_user, p.created_at, u.pseudo, SUM(islike = 1) AS liked, SUM(islike = 0) as disliked FROM post p LEFT JOIN user_post us ON p.id = us.post_id LEFT JOIN user u ON p.id_user = u.id GROUP BY p.id ORDER BY p.id DESC LIMIT 0,'+limit;
    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec BD", err);
        else {
            return res.status(200).json(results);
        }
    })
};

//---------middleware post pour supprimer 1 post  ----------//

exports.deletPost = (req, res, next) => {

    let idpost = req.params.idpost;
    let sql = 'DELETE FROM post WHERE id=' + idpost;

    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec de suppréssion en BD", err);
        else {
            if (req.body.url.length > 0) {
                const filename = req.body.url.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    return res.status(200).json({ message: 'post supprimé !' })
                });
            }
            else {
                return res.status(200).json({ message: 'post supprimé !' })
            }
        }
    })
};

//---------middleware post pour get les commentaires  ----------//

exports.getComments = (req, res, next) => {

    let idpost = req.params.idpost;
    let limit = req.params.limit;
    let sql = 'SELECT c.id, c.text, c.id_user, c.id_post, c.created_at, email, pseudo, avatar  FROM comment c LEFT JOIN post p ON p.id = c.id_post LEFT JOIN user u ON u.id = c.id_user WHERE p.id ='+idpost+' ORDER BY c.id DESC LIMIT 0,'+limit
    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec BD");
        else {
            const result = Object.values(JSON.parse(JSON.stringify(results)));
            return res.status(200).json(result)
        }
    })
};

//---------middleware post pour liker/disliker 1 post ----------//

exports.likePost = (req, res, next) => {

    let idpost = req.params.idpost;
    let like = req.body[0].like;
    let userId = req.body[0].userId;

    let sqlSelect = 'SELECT user_id, post_id, islike FROM user_post WHERE user_id = ' + userId + ' AND post_id = ' + idpost + '';

    connexion.query(sqlSelect, (err, results) => {
        if (err) console.log('echec BD', err);
        else {
            const result = Object.values(JSON.parse(JSON.stringify(results)));

            if (!result.length) {
                let sqlInsert = 'INSERT INTO user_post (user_id, post_id, islike) VALUES (' + userId + ', ' + idpost + ', ' + like + ')';
                connexion.query(sqlInsert, (err, results) => {
                    if (err) console.log('echec BD', err);
                    else {
                        console.log("like appliqué ! / ligne créé")
                        return res.status(200).json({ message: "like appliqué ! / ligne créé" });
                    }
                });
            }
            if (result.length && like === null) {
                let sqlDelet = 'DELETE FROM user_post WHERE user_id = ' + userId + ' AND post_id = ' + idpost + '';
                connexion.query(sqlDelet, (err, results) => {
                    if (err) console.log('echec BD', err);
                    else {
                        console.log("like supprimé !")
                        return res.status(200).json({ message: "like supprimé !" });
                    }
                });
            }
            if (result.length && like === false || result.length && like === true) {
                let sqlUpdateDislike = 'UPDATE user_post SET islike = ' + like + ' WHERE user_id = ' + userId + ' AND post_id = ' + idpost + '';
                connexion.query(sqlUpdateDislike, (err, results, fields) => {
                    if (err) console.log('echec BD', err);
                    else {
                        console.log("dislike/like appliqué !")
                        return res.status(200).json({ message: "dislike/like appliqué !" });
                    }
                });
            }
        }
    });
};



exports.getLike = (req, res, next) => {

    let idpost = req.params.idpost;
    let userId = req.params.userId;

    

    let sql = 'SELECT * FROM user_post WHERE user_id ='+userId+' AND post_id ='+idpost;
    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec BD", err);
        else {
            const result = Object.values(JSON.parse(JSON.stringify(results)));
            return res.status(200).json(result);
        }
    })
};





