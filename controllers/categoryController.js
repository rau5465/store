const asyncHandler =require('express-async-handler')
const Category = require('../model/categoryModel');
const User = require('../model/userModel');

const getCategory = asyncHandler(async(req,res)=>{
    const category= await Category.find().select('-__v')
    res.status(200).json(category)
})

const postCategory = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User Not found')
    }
 
    let data={
        name:req.body.name,
    }
    if(req.body.details){
        data.details=req.body.details
    }
    const category= await Category.findOne({name:req.body.name})
    if(category){
        res.status(400)
        throw new Error('Category Already Exists')
    }
    const result = await Category.create(data)
    if(!result){
        res.status(400)
        throw new Error('Can not create category')
    }
    res.status(200).json(result);
})


const deleteCategory = asyncHandler(async(req,res)=>{
    if(!req.params.id && !req.params.name){
        res.status(400)
        throw new Error('Wrong data recived')
    }
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User not Found')
    }
    const name=req.params.name
    let category= await Category.findOne({name})
    if(!category){
        res.status(400)
        throw new Error('Category not Found')
    }
    await category.remove();
    category= await Category.find().select('-__v')
    res.status(200).json(category)
})


module.exports={
    getCategory,
    postCategory,
    deleteCategory
}
