const mongoose = require('mongoose')

const userUschema = new mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
        
    },
    cartData:{
        type:Object,
        

    },
    date:{
        type:Date,
        default:Date.now

    }
})


const users = mongoose.model('users',userUschema)

module.exports = users