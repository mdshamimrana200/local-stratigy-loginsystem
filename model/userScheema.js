const { default: mongoose } = require("mongoose");
const { v4 } = require("uuid");

const userScheema = mongoose.Schema({

    id:{
        type: String,
        default: v4()
    },
    email:{
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    againPassword:{
        type: String,
        require: true
    },
    createdOn:{
        type: Date,
        default: Date.now
    },
})

let modelScheema = mongoose.model("user",userScheema)
module.exports = modelScheema;