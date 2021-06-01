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
            : null;
    } catch (err) {

    }

}