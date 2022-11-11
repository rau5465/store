const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is missing"]
    },
    email:{
        type:String,
        required:[true, "Email is missing"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is missing"]
    },
    role:{
        type:Number,
        required:[true,"Role is missing"]
    },
    createTime:{
        type:Number,
        default:new Date().getTime()
    },
    lastLogin:{
        type:String,
        default:null
    }
})

module.exports = mongoose.model('User', userSchema)