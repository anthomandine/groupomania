const connexion = require('../config/bdd.js');
const fs = require("fs");

//---------middleware post pour créer 1 post ----------//

exports.createPost = (req, res, next) => {

    let post = req.body.post;
    let userId = req.body.userId;
    let imageUrl = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '';
    const formatYmd = date => date.toLocaleDateString();
    let date = formatYmd(new Date());

    let sql = 'INSERT INTO posts (post, imageUrl, idAuthor, created_at) VALUES (\'' + post + '\', \'' + imageUrl + '\', \'' + userId + '\', \'' + date + '\' )';
    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec d'enregistrement à BD", err);
        else {
            res.status(200).json({ message: "post créé !" });
        }
    });
};

//---------middleware post pour récupérer tous les posts ----------//

exports.getAllPosts = (req, res, next) => {

    let sql = `SELECT * FROM testdb.posts LEFT JOIN testdb.users ON testdb.posts.idAuthor = testdb.users.userId ORDER BY idpost DESC`;
    let sqllike = 'SELECT * FROM users_posts LEFT JOIN users ON users.userId = users_posts.users_userId'

    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec BD", err);
        else {
            connexion.query(sqllike, (err, results1, fields) => {
                if (err) console.log("Echec BD", err);
                else {
                    res.status(200).json({results: results, results1: results1});
                }
            })
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
                    res.status(200).json({ message: 'post supprimé !' })
                });
            }
            else {
                res.status(200).json({ message: 'post supprimé !' })
            }
        }
    })
};

//---------middleware post pour get les commentaires  ----------//

exports.getComments = (req, res, next) => {

    let idpost = req.params.idpost;
    let sql = 'SELECT * FROM comment INNER JOIN posts ON posts.idpost = comment.idPost LEFT JOIN users ON users.userId = comment.idAuthor WHERE posts.idpost = ' + idpost + ' ORDER BY comment.idcomment DESC';
    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec BD");
        else {
            const result = Object.values(JSON.parse(JSON.stringify(results)));
            res.status(200).json(result)
        }
    })
};

//---------middleware post pour liker/disliker 1 post ----------//

exports.likePost = (req, res, next) => {

    let idpost = req.params.idpost;
    let like = req.body[0].like;
    let userId = req.body[0].userId;

    let sqlSelect = 'SELECT * FROM users_posts WHERE users_userId = ' + userId + ' AND posts_idpost = ' + idpost + '';

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
                        res.status(200).json({ message: "like appliqué ! / ligne créé" });
                    }
                });
            }
            if (result.length && like === null) {
                let sqlDelet = 'DELETE FROM users_posts WHERE users_userId = ' + userId + ' AND posts_idpost = ' + idpost + '';
                connexion.query(sqlDelet, (err, results) => {
                    if (err) console.log('echec BD', err);
                    else {
                        console.log("like supprimé !")
                        res.status(200).json({ message: "like supprimé !" });
                    }
                });
            }
            if (result.length && like === false || like === true) {
                let sqlUpdateDislike = 'UPDATE users_posts SET islike = ' + like + ' WHERE users_userId = ' + userId + ' AND posts_idpost = ' + idpost + '';
                connexion.query(sqlUpdateDislike, (err, results, fields) => {
                    if (err) console.log('echec BD', err);
                    else {
                        console.log("dislike appliqué !")
                        res.status(200).json({ message: "dislike appliqué !" });
                    }
                });
            }
        }
    });
};



