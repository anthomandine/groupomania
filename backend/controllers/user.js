const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//-------- Initialisation mysql ---------//

const mysql = require('mysql');

//--------Conexion à la base de données---------//

const connexion = mysql.createConnection({

  host: "localhost",

  user: "root",

  password: "Amandine2006+",

  database : "testdb"

});

connexion.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});


//---------middleware post pour l'inscription ----------//


exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        let userEmail = req.body.email;
        let userPassword = hash;
        let userPseudo = req.body.pseudo;
        let sql=`INSERT INTO users(email, password, pseudo) VALUES (?,?,?)`;
 
        connexion.query(sql,[userEmail, userPassword, userPseudo],(err, results, fields)=>{
            if(err)console.log("Echec d'enregistrement à BD");
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
    let userId = req.body.userId;

    let sql = `SELECT * FROM testdb.users`;

    connexion.query(sql, (err, results, fields)=>{
        if (err) console.log("Echec BD");

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            
            if(result.email != userEmail){
                res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(userPassword, result.password)
            .then(valid => {
                if (!valid) {
                        res.status(401).json({ error: 'Mot de passe incorrect !' });
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
        .catch(error => res.status(500).json({ error }));
        }
    });
};