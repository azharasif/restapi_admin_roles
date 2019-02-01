const Usermodel = require('../Model/user');


exports.list = (req, res) => {

    Usermodel.find().then((user) => {
        res.status(201).send({user });

    })

}


exports.getbyid = (req, res) => {

    Usermodel.findById(req.params.userId).then((result) => {
     
       res.status(501).send(result)

    })

}

exports.RemovebyId = (req, res) => {

    Usermodel.findByIdAndRemove(req.params.userId).then((result) => {
        res.status(204).send({result:"deleted sucessfully"})
    })
}

// exports.updatebyid = (req, res)=>{ 

// Usermodel.findByIdAndUpdate(req.body , function (err, user){


//     console.log(user);

//     if (err) reject(err);
// }



// )}





exports.patchById = (req, res) => {
  
    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        UserModel.findById(id, function (err, user) {
            
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })

};