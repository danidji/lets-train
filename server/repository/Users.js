const mongoose = require('mongoose');

// connexion à la base de donnée 
require('../bdd/database')();


//Définir un type "objectId"
const ObjectId = mongoose.Types.ObjectId;


const schemaOptions = {
    timestamps: { // ajout de la date et l'heure à la création et modification
        createdAt: "created_at", updatedAt: "edited_at"
    }
    , versionKey: false
};

// Schéma de données propres aux sous programmes 
const userSchema = mongoose.Schema({
    email: { type: String, required: true }
    , password: { type: String, required: true }
    , avatar: { type: String }
    , programsList: { type: Array }
    , uuid: { type: String, required: true } // permet d'avoir un ID pour récupérer le user dans le passport

}, schemaOptions);


module.exports = class User {
    constructor() {
        this.db = mongoose.model('users', userSchema);
    }

    findUser(obj) {
        return new Promise((resolve, reject) => {
            this.db.findOne(obj, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }

    add(user) {
        return new Promise((resolve, reject) => {
            this.db.create(user, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    // docs : https://devdocs.io/mongoose/api/model#model_Model.findOneAndUpdate
    findAndUpdate(objToFind, objToUpdate) {
        return new Promise((resolve, reject) => {
            this.db.findOneAndUpdate(
                objToFind
                , objToUpdate
                , {
                    new: true, useFindAndModify: false
                })
                .then((err, doc) => {
                    if (err) reject(err);
                    resolve(doc);
                })
        })
    }

}