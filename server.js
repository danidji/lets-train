const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();



// // BodyParser
// app.use(bodyParser.urlencoded({ extended: true }));
// // parse application/json
// app.use(bodyParser.json());

// BodyParser
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
//Chargement des routes 
require('./server/routes')(app);


// Ecoute du serveur port 3030
app.listen(3030, () => {
    console.log(`Le serveur a bien démarré : http://localhost:${3030}`)
})

