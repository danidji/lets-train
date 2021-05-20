const Program = require('./controllers/Programs');
let repo = new Program();

module.exports = (app) => {

    app.get('/liste-programme', (req, res) => {
        console.log('YIOOOO');
        repo.print(req, res)
    })
    //inclure les vérifications formulaires
    app.post('/enregistrer-programme', (req, res) => {
        // console.log(req.body);
        repo.processForm(req, res)

        // console.log('Yooo');
        // res.send('réussi')
    })
}