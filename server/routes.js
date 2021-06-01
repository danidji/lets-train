const Program = require('./controllers/Programs');
let repoProgram = new Program();

const SubPrograms = require('./controllers/ProgramsContent');
let repoSubProg = new SubPrograms();

const User = require('./controllers/Users');
let repoUser = new User();


const multer = require("multer"); // pour le téléchargement de fichier 


// gestion de l'enregistrement fichier via multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../uploads")
    },
    filename: function (req, file, cb) {

        console.log(`file`, file)
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
    , limits: { // gestion de la limite des fichiers acceptés
        fileSize: 1024 * 1024 * 50 // 50mB max
    }
});





module.exports = (app) => {


    /**TODO
     * - inclure les vérifications formulaires
     * - faire la route d'édition des sous programmes 
     * - faire la route de suppression des sous programmes 
     *  */

    app.get('/', (req, res) => {
        res.send('Salut mec')
    })

    /*************************************************
     * ROUTES DE GESTION DES PROGRAMMES
     */

    //affichage 
    app.get('/api/programmes/liste', (req, res) => {
        repoProgram.print(req, res)
    })

    //formulaire d'ajout

    app.post('/api/programmes/ajouter', (req, res) => {
        repoProgram.processForm(req, res)
    })

    /********************************************
     * ROUTES DE GESTION DES SOUS PROGRAMMES
     */

    //affichage
    app.get('/api/sous-programmes/liste', (req, res) => {
        repoSubProg.print(req, res);
    })

    // Retourner le sous programme suivant
    app.get('/api/sous-programmes/next-video', (req, res) => {
        // console.log('yooo');
        repoSubProg.printNext(req, res);
    })

    /****************************************
     * ROUTES DE GESTION DES USERS
     */

    // register
    app.post('/api/user/register', (req, res) => {
        repoUser.processRegister(req, res);
    })

    //login
    app.post('/api/user/login', (req, res) => {
        repoUser.processLogin(req, res);
    })

    //enregistrement image avatar
    app.post('/api/user/edit/avatar-image', upload.single("image"), (req, res) => {
        repoUser.editAvatarImage(req, res);
    })

}