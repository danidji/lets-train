let SubPrograms = require('../repository/ProgramsContent');
let repo = new SubPrograms();

module.exports = class SubPrograms {

    print(req, res) {
        repo.findProgramsContent(req.query.parentId).then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err)
        })
    }

}