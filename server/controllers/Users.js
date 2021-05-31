const User = require('../repository/Users');
let repoUser = new User();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const validator = require('validator')


const jwtConfig = {
    secret: "dmdkjfmdskjfnsmkjvnmv212121oTUUTUUTùckl", // TODO déplacer dans un fichier de config
    expiresIn: "2 days",
};

// Génération d'un uuid unique
function S4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
}

function generateGUID() {
    return S4() + S4();
}

module.exports = class User {

    processLogin(req, res) {
        const user = req.body.params.user;
        console.log(`User -> processLogin -> user`, user)

        const { email, password } = user;

        try {
            //On cherche l'email en base
            repoUser.findUser({ email: email }).then((user) => {
                let errors = {
                    email: user ? null : "Vérifier votre email",
                    password: user ? null : "Vérifier votre mot de pass"
                }
                // console.log(`User -> repoUser.findUser -> user`, user)

                //Si je récupère bien un utilisateur
                if (user) {
                    //on compare le mdp en base avec celui saisie
                    bcrypt.compare(password, user.password)

                        //          v  true / false si le mdp est égale ou non
                        .then((isMatch) => {
                            //Si mes mdp sont bien identique
                            if (isMatch) {
                                errors.password = null;

                                // Conditions pas vraiment utile étant données qu'ici on a forcément un mdp équivalent et un user 
                                if (!errors.username && !errors.password) {
                                    //on enlève le mdp de l'objet pour ne pas l'envoyer au front
                                    delete user["password"];

                                    //création du Token
                                    const access_token = jwt.sign(
                                        { id: user.uuid },
                                        jwtConfig.secret,
                                        {
                                            expiresIn: jwtConfig.expiresIn
                                        }
                                    )

                                    const userData = {
                                        user: user, // object user sans le mdp
                                        access_token: access_token   // token d'authification qui sera géré coté front avec le secureStore
                                    };
                                    // console.log(`User -> .then -> userData`, userData)
                                    //Envoi des données au front


                                    res.json({ data: userData, errors: {} })
                                }
                            } else {
                                errors = {
                                    password: "Vérifiez votre mot de passe"
                                }
                                res.json({ errors: errors })
                            }
                        })
                } else {
                    console.log(`mes erreurs :`, errors)

                    res.json({ errors: errors })
                }
            });


        } catch (error) {
            console.log(error);
        }
    }


    processRegister(req, res) {
        const user = req.body.params.user;

        const { email, password, verifPass } = user;

        repoUser.findUser({ email: email }).then((user) => {
            const errors = {
                password: !password ? "Vérifier votr mot de passe" : null,
                verifPass: verifPass !== password ? "Les deux mots de passe doivent être identique" : null
            };
            if (user) {
                // console.log(`User -> repoUser.findUser -> user`, user)
                errors.email = "Cet utilisateur existe déjà";
            } else {
                if (validator.isEmpty(email)) {
                    errors.email = "Vous devez indiquer un email";
                } else if (!validator.isEmail(email)) {
                    errors.email = "Ce n'est pas un email valide";
                } else {
                    errors.email = null;
                }
            }
            if (!errors.email && !errors.password && !errors.verifPass) {

                let newUser = {
                    email: email,
                    password: password,
                    uuid: generateGUID(),
                    programsList: [],
                    avatar: "",
                }

                // Hash du mot de passe 
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;  // dans le cas de l'ecriture dans un fichier de log pour répertorier les erreurs : fs.appendFile('saltdebug.log', JSON.stringify(err));

                        newUser.password = hash;

                        //enregistrement de l'utilisateur
                        repoUser.add(newUser).then((user) => {
                            // delete user["password"]; => penser a faire un clone deep dans le cas ou un save est réalisé

                            const access_token = jwt.sign(
                                { id: user.uuid },
                                jwtConfig.secret,
                                {
                                    expiresIn: jwtConfig.expiresIn
                                }

                            );
                            // On renvoie le token coté front
                            const data = {
                                // user: user
                                access_token: access_token
                            };

                            res.json(data)
                        })
                    })
                })


            } else {
                res.json({ errors: errors })
            }

        })


    }
}