//-------- Initialisation mysql ---------//

const mysql = require('mysql');

//--------Conexion à la base de données---------//

function connexion() {
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Amandine2006+",
        database : "groupomania"
      });
      db.connect(function (err) {
        if (!err) {
          console.log('Connecté à la base de données MySQL!');
        } else {
          console.log('erreur de connexion a la base de données mySQL');
        }
      });
    return db;
}

module.exports = connexion();