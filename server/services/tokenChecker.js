const jwt = require("jsonwebtoken");

const jwtConfig = {
    secret: "dmdkjfmdskjfnsmkjvnmv212121oTUUTUUTùckl", // TODO déplacer dans un fichier de config
    expiresIn: "2days",
};

const User = require('../repository/Users');
let repoUser = new User();

module.exports = function tokenChecker(req, res, next) {
    let error = {
        description: "Le token n'esn pas correct, vérifier le et tentez de vous reconnecter",
        code: "TokenNOK"
    }
    try {
        const access_token = req.headers.authorization // Bearer : token
            ? req.headers.authorization
                .match(/^(\S+)\s(.*)/) // sépare la chaine par rapport à l'espace après le premier mot => sous forme de tableau
                .slice(1)[1] // récupère le token à l'indice 1 du tableau ^
                .trim() // enlève les espace  // ==> ne récupère que le token dans Bearer: token
            : null;
        if (access_token) {
            const { id } = jwt.verify(access_token, jwtConfig.secret); // récupération de l'id du token soit "uuid" en bdd

            // on cherche le user en fonction de l'uuid présent dans le token
            repoUser.findUser({ uuid: id }).then((user) => {
                // si je récupère bien mon utilisateur, on peut renvoyer les données
                if (user) {
                    delete user["password"];

                    const data = {
                        user: user,
                        code: "ValidToken",
                        description: "Token approuvé"
                    }
                    req.data = data;
                    console.log(`repoUser.findUser -> req.data`, req.data)


                    next();
                }
            })
        } else if (req.data.originalUrl.includes("uploads")) { //temporaire 
            next();
        } else {
            throw error; // => l'obj sera retourner dans le catch
        }

    } catch (err) {
        //    ^ ici on récupérera l'objet error


        // console.log(`tokenChecker -> err`, err)
        req.error = err;
        next();
        // res.status(403).send(err);
    }

}