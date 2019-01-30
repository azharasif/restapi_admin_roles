const Usermodel = require('../Model/user');


exports.list = (req, res) => {

    Usermodel.find().then((user) => {
        res.status(201).send({user });

    })

}


exports.getbyid = (req, res) => {
 console.log(req.params.userId)
    Usermodel.findById(req.params.userId).then((result) => {
     
       res.status(501).send(result)

    })

}

exports.RemovebyId = (req, res) => {

    Usermodel.RemovebyId(req.params.userId).then((result) => {
        res.status(204).send({})
    })
}
