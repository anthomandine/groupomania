# Groupomania
  
Le projet _Groupomania_ est un réseau social interne d'entreprise permettant aux adérents d'envoyer des posts text, image, gif ..., de commenter et de liker. Le but de cet outil est de faciliter les interactions entre collègues.
  
### Pré-requis  
   
- telecharger node js  
- préparer la base de donné avec le dump SQL :
    port: 3306
    host: localhost
    user: root
    password: Amandine2006+
    database: groupomania
   
### Installation et démarrage  
  
Executer la commande à la racine :  
  
 ``make start``
La page web s'ouvre ...  
  
ou  
  
 - cd /groupomania/backend : ``npm install``
 - cd /groupomania/backend : ``nodemon server`` ou ``node server``
   
 Le back est en marche ...  
  
 et  
   
 - cd /groupomania : ``npm install``
 - cd /groupomania : ``npm start``  
   
 La page web s'ouvre ...  
   
     
       
### Arrêter le projet  
  
  Executer la commande à la racine : (pkill node)
    
``make stop``


