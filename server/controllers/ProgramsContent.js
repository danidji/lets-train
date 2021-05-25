let SubPrograms = require('../repository/ProgramsContent');
let repo = new SubPrograms();

module.exports = class SubPrograms {

    print(req, res) {
        repo.findProgramsContent(req.query.parentId).then((result) => {
            setTimeout(() => res.send(result), 1000)
        }).catch((err) => {
            console.log(err)
        })
    }

    printNext(req, res) {
        console.log(typeof parseInt(req.query.order));
        repo.findNextPrograms(req.query.parentId, parseInt(req.query.order)).then((result) => {
            setTimeout(() => res.send(result), 1000)
        }).catch((err) => {
            console.log(err);
        })
    }
}