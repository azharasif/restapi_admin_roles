const express = require("express");
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
var app = express();


const port = 3000 ;


app.listen((port) , function(req , res){
 
    console.log("server lstning on  port " +port)


})

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/eth-api-test', {
    useNewUrlParser: true
}).then(() => {
    console.log('Database Connnected');
}).catch((err) => {
    console.log(err);
})


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());

app.use(require('./Routes/routes'))
