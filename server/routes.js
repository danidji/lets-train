const Program = require('./controllers/Programs');
let repo = new Program();

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send('Salut mec')
    })


    //affichage de la liste des programmes
    app.get('/api/programmes/liste', (req, res) => {
        repo.print(req, res)
    })


    //route gestion du formulaire d'ajout programmes 
    // - inclure les vérifications formulaires
    app.post('/api/programmes/ajouter', (req, res) => {
        repo.processForm(req, res)

    })
}