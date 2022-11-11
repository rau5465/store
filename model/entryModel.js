const mongoose = require('mongoose')

const entrySchema = mongoose.Schema({
    products:{
        type:Array,
        required:[true, "Products are missing"]
    },
    billNumber:{
        type:String,
    },
    gstno:{
        type:String,
    },
    contactId:{
        type:String,
    },
    contactName:{
        type:String,
    },
    qty:{
        type:String,
        required:[true,"Quantity is missing"]
    },
    type:{
        type:String,
        required:[true,"Entry Type recieve is misssing"],
        //values: recieved/Expense
    },
    dated:{
        type:String,
        default:new Date().toLocaleString()
        //for old data 
    },
    details:{
        type:String,
        default:null
    },
    createTime:{
        type:String,
        default:new Date().toLocaleString()
    },
    igstr:{
        type:String,
    },
    sgstr:{
        type:String,
    },
    cgstr:{
        type:String,
    },
    igst:{
        type:Number,
    },
    sgst:{
        type:Number,
    },
    cgst:{
        type:Number,
    },
    shippingCost:{
        type:Number
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

module.exports = mongoose.model('Entry', entrySchema)