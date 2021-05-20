let Programs = require('../repository/Programs');
let repo = new Programs();

module.exports = class Programs {

    print(req, res) {
        repo.findAll().then((result) => {
            console.log(`Programs -> repo.findAll -> result`, result)
            res.send(result)
        }).catch((err) => {
            console.log(err)
        })
    }
    processForm(req, res) {
        console.log(req.body.data);

        let programData = {
            program_name: req.body.data.program_name
            , level: req.body.data.level
            , description: req.body.data.description
            , poster_image: req.body.data.poster_image
        }
        console.log(`Programs -> processForm -> programData`, programData)
        repo.add(programData).then((result) => console.log('controllers', result))

    }
}