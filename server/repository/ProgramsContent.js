const mongoose = require('mongoose');

// connexion à la base de donnée 
require('../bdd/database')();


//Définir un type "objectId"
// const ObjectId = mongoose.Types.ObjectId;


// Schéma de données propres aux sous programmes 
const programContentSchema = mongoose.Schema({
    title: { type: String }
    , program: { type: String }
    , video_url: { type: String }
    , poster_image: { type: String }
    , duration_indicator: { type: Number }
    , order: { type: Number }

}, { versionKey: false });

module.exports = class SubPrograms {
    constructor() {
        this.db = mongoose.model('subprograms', programContentSchema);
    }

    add(data) {
        return new Promise((resolve, reject) => {
            this.db.create(data, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            })
        })
    }

    findProgramsContent(id) {
        return new Promise((resolve, reject) => {
            this.db.find({ program: id }, (err, docs) => {
                if (err) reject(err);
                resolve(docs);
            });
        });
    }
}