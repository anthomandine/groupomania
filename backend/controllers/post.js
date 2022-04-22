const connexion = require('../config/bdd.js');
const fs = require("fs");

//---------middleware post pour créer 1 post ----------//

exports.createPost = (req, res, next) => {

    let post = req.body.post;
    let userId = req.body.userId;
    let imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '';

    let sql = 'INSERT INTO posts (post, imageUrl, idAuthor, created_at) VALUES (\'' + post + '\', \'' + imageUrl + '\', \'' + userId + '\', Now() )';
    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec d'enregistrement à BD", err);
        else {
            return res.status(200).json({ message: "post créé !" });
        }
    });
};

//---------middleware post pour récupérer tous les posts ----------//

exports.getAllPosts = (req, res, next) => {

    let userId = req.params.userId;
    let limit = req.params.limit;

    let sql = 'SELECT * FROM testdb.posts LEFT JOIN users_posts ON posts.idpost = users_posts.posts_idpost AND ' + userId + ' = users_posts.users_userId LEFT JOIN testdb.users ON testdb.posts.idAuthor = testdb.users.userId ORDER BY idpost DESC LIMIT 0, ' + limit;
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
    let sql = 'DELETE FROM testdb.posts WHERE idpost=' + idpost;

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
    let sql = 'SELECT * FROM comment INNER JOIN posts ON posts.idpost = comment.idPost LEFT JOIN users ON users.userId = comment.idAuthor WHERE posts.idpost = ' + idpost + ' ORDER BY comment.idcomment DESC LIMIT 0, ' + limit;
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

    let sqlSelect = 'SELECT users_userId, posts_idpost, islike FROM users_posts WHERE users_userId = ' + userId + ' AND posts_idpost = ' + idpost + '';

    connexion.query(sqlSelect, (err, results) => {
        if (err) console.log('echec BD', err);
        else {
            const result = Object.values(JSON.parse(JSON.stringify(results)));

            if (!result.length) {
                let sqlInsert = 'INSERT INTO users_posts (users_userId, posts_idpost, islike) VALUES (' + userId + ', ' + idpost + ', ' + like + ')';
                connexion.query(sqlInsert, (err, results) => {
                    if (err) console.log('echec BD', err);
                    else {
                        console.log("like appliqué ! / ligne créé")
                        return res.status(200).json({ message: "like appliqué ! / ligne créé" });
                    }
                });
            }
            if (result.length && like === null) {
                let sqlDelet = 'DELETE FROM users_posts WHERE users_userId = ' + userId + ' AND posts_idpost = ' + idpost + '';
                connexion.query(sqlDelet, (err, results) => {
                    if (err) console.log('echec BD', err);
                    else {
                        console.log("like supprimé !")
                        return res.status(200).json({ message: "like supprimé !" });
                    }
                });
            }
            if (result.length && like === false || result.length && like === true) {
                let sqlUpdateDislike = 'UPDATE users_posts SET islike = ' + like + ' WHERE users_userId = ' + userId + ' AND posts_idpost = ' + idpost + '';
                connexion.query(sqlUpdateDislike, (err, results, fields) => {
                    if (err) console.log('echec BD', err);
                    else {
                        console.log("dislike appliqué !")
                        return res.status(200).json({ message: "dislike/like appliqué !" });
                    }
                });
            }
        }
    });
};


exports.getSumLike = (req, res, next) => {

    let idpost = req.params.idpost;
    let sql = 'SELECT posts_idpost, SUM(islike = 1) AS liked, SUM(islike = 0) AS disliked FROM users_posts WHERE posts_idpost =' + idpost;
    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec BD", err);
        else {
            return res.status(200).json(results);
        }
    })
};
