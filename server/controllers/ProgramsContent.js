let SubPrograms = require('../repository/ProgramsContent');
let repo = new SubPrograms();

module.exports = class SubPrograms {

    print(req, res) {
        // console.log('test', req);
        repo.findProgramsContent(req.query.id).then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err)
        })
    }

}