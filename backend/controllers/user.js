const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connexion = require('../config/bdd.js');

//---------middleware post pour l'inscription ----------//

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        let userEmail = req.body.email;
        let userPassword = hash;
        let userPseudo = req.body.pseudo;
        let userAvatar = req.body.avatar;
        let sql=`INSERT INTO users(email, password, pseudo, avatar) VALUES (?,?,?,?)`;
 
        connexion.query(sql,[userEmail, userPassword, userPseudo, userAvatar],(err, results, fields)=>{
            if(err)console.log("Echec d'enregistrement à BD", err);
            else{
                console.log("Enregistrement effectuee");
                res.status(200).json({message: "Utilisateur créé !"});
            }
        });
      })  
      .catch(error => res.status(500).json({ error })); 
    };

//---------middleware post pour la connexion  ----------//

exports.login = (req, res, next) => {
    
    let userEmail = req.body.email;
    let userPassword = req.body.password; 
    
    let sql = `SELECT email, password, userId FROM testdb.users WHERE email= ?`;

    connexion.query(sql,userEmail, (err, results, fields)=>{
        if (err) console.log("Echec BD", err);
            const result = results;
            const userId = result[0].userId;
            
            if(result == '') {
                return res.status(401).json({ error: 'Email introuvable ou incorrect !' }); 
                 }
            if(result[0].email == userEmail){
                bcrypt.compare(userPassword, result[0].password)
            .then(valid => {
                if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
            console.log("connexion reussie");
                res.status(200).json({
                    userId: userId,
                    token: jwt.sign(
                        {userId: userId},
                        'RANDOM_TOKEN',
                        { expiresIn: '24h' }
                    )
                });
            })
        }
    });
};


//---------middleware get pour recupérer un profil  ----------//


exports.getOneUser = (req, res, next) => {

    const sql = `SELECT * FROM testdb.users WHERE userId= ?`;
    const userId = req.params.userId;

    connexion.query(sql, userId, (err, results, fields) =>{
        if (err) console.log("Echec BD", err);
        res.status(200).json(results)
    });
};

//---------middleware get pour modifier un profil  ----------//

exports.modifyUser = (req, res, next) => {
    
    const userId = req.params.userId;
    const pseudo = req.body.pseudo;
    const avatar = req.body.avatar;
    const sql = 'UPDATE users SET pseudo=\'' + pseudo + '\', avatar=\'' + avatar + '\' WHERE userId=' + userId ;

    connexion.query(sql, (err, results, fields) => {
        if (err) console.log("Echec BD", err);
        else{
            console.log("information mis à jour.")
            res.status(200).json(results);
        };
    });
};
