const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// require('dotenv').config();



// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


//Chargement des routes 
// require('./serveur/routes')(app);


// Ecoute du serveur port 3030
app.listen(3030, () => {
    console.log(`Le serveur a bien démarré : http://localhost:${3030}`)
})

