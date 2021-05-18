const mongoose = require('mongoose');

// connexion à la base de donnée 
require('./server/bdd/database')();

// Schéma de donées propres aux programmes 

const programSchema = mongoose.Schema({
    name: { type: String }
    , level: { type: Number }
    , description: { type: String }
    , poster_image: { type: String }

}, { versionKey: false });

module.exports = class Programs {
    constructor() {
        this.db = mongoose.model('program', programSchema);
    }


    add(data) {
        return new Promise((resolve, reject) => {
            this.db.create(data, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }


}