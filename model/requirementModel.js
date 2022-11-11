const mongoose = require('mongoose')

const requirementSchema = mongoose.Schema({
    remarks:{
        type:String
    },
    products:{
        type:Array,
        required:[true, "Products are missing"]
    },
    demandBy:{
        type:String,
    },
    category:{
        type:String,
    },
    dated:{
        type:String,
    },
    totalCost:{
        type:Number
    },
    updateTime:{
        type:String,
        default:new Date().getTime()
    },
    createdBy:{
        type:String,
        required:[true,"First creater UserId  is misssing"]
    },
    updatedBy:{
        type:String,
    },
    ownerName:{
        type:String,
        required:[true,"First creater Name is misssing"]
    },

})

module.exports = mongoose.model('Requirement', requirementSchema)