const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Supplier Name is missing"],
        unique:true
    },
    contactPerson:{
        type:String
    }
    ,
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
    },
    gstno:{
        type:String,
    },
    createdBy:{
        type:String,
        required:[true,"Person editing id is missing"]
    },
    ownerName:{
        type:String,
        required:[true,"Person editing Name is missing"]
    },
    createdAt:{
        type:Number,
        default:new Date().getTime()
    }
})

module.exports = mongoose.model('Contact', contactSchema)