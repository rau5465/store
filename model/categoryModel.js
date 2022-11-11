const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Category name is missing"],
        unique:true
    },
    details:{
        type:String,
    }
})

module.exports = mongoose.model('Category', categorySchema)