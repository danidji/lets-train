const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect(`mongodb+srv://danUser:${process.env.DB_PWD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}`,
        {
            connectTimeoutMS: 3000
            , socketTimeoutMS: 20000
            , useNewUrlParser: true
            , useUnifiedTopology: true
        });
    mongoose.set('useCreateIndex', true);

    const db = mongoose.connection;
    db.once('open', () => {
        console.log(`connexion OK !`);
    });
}