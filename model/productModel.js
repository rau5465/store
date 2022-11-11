const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName:{
        type:String,
        required:[true, "Product Name is missing"],
        unique:true
    },
    category:{
        type:String,
        required:[true, "Category is missing"],
       
    },
    details:{
        type:String
    },
    size:{
        type:String,
    },
    used:{
        type:Number,
        default:0
    },
    qty:{
        type:Number,
        default:0
    },
    rate:{
        type:Number,
        default:0
    },
    warrentyExDate:{
        type:Number,
        default:null
    },
    contactName:{
        type:String,
    },
    updatedAt:{
        type:Number,
        default:null
    }
    ,
    createdBy:{
        type:String,
        required:[true,"Person editing id is missing"]
    },
    ownerName:{
        type:String,
        required:[true,"Person editing Name is missing"]
    }
})

module.exports = mongoose.model('Product', productSchema)