const mongoose = require('mongoose')

const historySchema = mongoose.Schema({
    dated:{
        type:String,
        required:[true, "Date is missing"],
        unique:true
    },
    products:{
        type:Array,
        required:[true, "Products are missing"],  
    }
})

module.exports = mongoose.model('History', historySchema)