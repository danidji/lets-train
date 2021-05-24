const Program = require('./controllers/Programs');
let repoProgram = new Program();

const SubPrograms = require('./controllers/ProgramsContent');
let repoSubProg = new SubPrograms();

module.exports = (app) => {


    /**TODO
     * - inclure les vérifications formulaires
     * - faire la route d'édition des sous programmes 
     * - faire la route de suppression des sous programmes 
     *  */

    app.get('/', (req, res) => {
        res.send('Salut mec')
    })

    //ROUTES DE GESTION DES PROGRAMMES

    //affichage 
    app.get('/api/programmes/liste', (req, res) => {
        repoProgram.print(req, res)
    })

    //formulaire d'ajout

    app.post('/api/programmes/ajouter', (req, res) => {
        repoProgram.processForm(req, res)
    })

    //ROUTES DE GESTION DES SOUS PROGRAMMES

    //affichage
    app.get('/api/sous-programmes/liste', (req, res) => {
        repoSubProg.print(req, res);
    })
}