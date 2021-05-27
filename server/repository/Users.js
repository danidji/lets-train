const mongoose = require('mongoose');

// connexion à la base de donnée 
require('../bdd/database')();


//Définir un type "objectId"
const ObjectId = mongoose.Types.ObjectId;


// Schéma de données propres aux sous programmes 
const UserSchema = mongoose.Schema({
    email: { type: String }
    , password: { type: String }
    , historic: { type: Array }

}, { versionKey: false });
