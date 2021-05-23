const Program = require('./controllers/Programs');
let repoProgram = new Program();

const SubPrograms = require('./controllers/ProgramsContent');
let repoSubProg = new SubPrograms();

module.exports = (app) => {

    app.get('/', (req, res) => {
        res.send('Salut mec')
    })

    //ROUTES DE GESTION DES PROGRAMMES

    //affichage 
    app.get('/api/programmes/liste', (req, res) => {
        // setTimeout(repoProgram.print(req, res), 2000);
        repoProgram.print(req, res)
    })

    //formulaire d'ajout
    // TODO- inclure les vérifications formulaires
    app.post('/api/programmes/ajouter', (req, res) => {
        repoProgram.processForm(req, res)
    })

    //ROUTES DE GESTION DES SOUS PROGRAMMES

    //affichage
    app.get('/api/sous-programmes/liste', (req, res) => {
        // console.log('Yooo');
        repoSubProg.print(req, res);
    })
}