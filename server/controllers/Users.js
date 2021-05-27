const User = require('../repository/Users');
let repoUser = new User();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const jwtConfig = {
    secret: "dmdkjfmdskjfnsmkjvnmvoTUUTUUTùckl", // TODO déplacer dans un fichier de config
    expiresIn: "2 days",
};



module.exports = class User {

    processLogin(req, res) {
        const user = req.body.params.user;

        const { email, password } = user;

        try {
            //On cherche l'email en base
            repoUser.findUser({ email: email }).then((user) => {
                let errors = {
                    email: user ? null : "Vérifier votre email",
                    password: user ? null : "Vérifier votre mot de pass"
                }
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
                                        access_token: access_token
                                    };
                                    //Envoi des données au front
                                    res.json({ data: userData, errors: errors })
                                }
                            } else {
                                errors = {
                                    password: "Vérifiez votre mot de passe"
                                }
                                res.json({ errors: errors })
                            }
                        })
                } else {
                    res.json({ errors: errors })
                }
            });


        } catch (error) {
            console.log(error);
        }
    }
}