const connexion = require('../config/bdd.js');

//---------middleware post pour créer 1 post ----------//

exports.createPost = (req, res, next) => {

    let post = req.body.post;
    let sql=`INSERT INTO posts (post) VALUES (?)`;
    
    
    connexion.query(sql, post, (err, results, fields)=>{
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
  