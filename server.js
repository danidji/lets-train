const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();


// //dependances pour l'auth
// const bcrypt = require("bcryptjs");
// const passport = require("passport"); // pour la gestion des authentification
// const jwt = require("jsonwebtoken");
// const multer = require("multer"); // pour le téléchargement de fichier 

// BodyParser => mise à jour, le module BodyParser n'est pas plus utile avec express 4.16
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

//middleware fichier static
app.use('/server', express.static(path.join(__dirname, 'uploads')))


const tokenChecker = require('./server/services/tokenChecker');

//Chargement des routes 
require('./server/routes')(app);


// Ecoute du serveur port 3030
app.listen(3030, () => {
    console.log(`Le serveur a bien démarré : http://localhost:${3030}`)
})

