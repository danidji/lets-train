let Programs = require('../repository/Programs');
let repo = new Programs();

module.exports = class Programs {

    print(req, res) {
        repo.findAll().then((result) => {
            setTimeout(() => res.send(result), 2000)

        }).catch((err) => {
            console.log(err)
        })
    }
    processForm(req, res) {
        let programData = {
            name: req.body.data.name
            , level: req.body.data.level
            , description: req.body.data.description
            , poster_image: req.body.data.poster_image
        }
        console.log(`Programs -> processForm -> programData`, programData)
        repo.add(programData).then((result) => {
            res.send(result)
        })

    }
}