const asyncHandler =require('express-async-handler')
const User = require('../model/userModel');
const Product = require('../model/productModel');

const getProducts = asyncHandler(async(req,res)=>{
    const products= await Product.find().select('-__v')
    res.status(200).json(products)
})

const postProduct = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.body.createdBy);
    if(!user){
        res.status(400)
        throw new Error('User Not found')
    }
    if(user.role ==1){
        res.status(401)
        throw new Error('You are not authorized to add a product')
    }
    const {productName, category, details, size, createdBy,contactName}=req.body
    let data={
       productName,
       category,
       details,
       createdBy,
       size,
       contactName,
       ownerName:user.name
    }
    if(req.body.qty){
        data.qty=req.body.qty
    }
    if(req.body.rate){
        data.rate=req.body.rate
    }
    if(req.body.used){
        data.used=req.body.used
    }
    const product= await Product.findOne({productName:data.productName})
    if(product){
        res.status(400)
        throw new Error('Product Already Exists')
    }
    const result = await Product.create(data)
    if(!result){
        res.status(400)
        throw new Error('Can not create Product')
    }
    res.status(200).json(result);
})


const putProduct= asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User Not found')
    }
    if(user.role ==1){
        res.status(401)
        throw new Error('You are not authorized to add a Product')
    }
    
    const product= await Product.findById(req.body._id)
    if(!product){
        res.status(400)
        throw new Error('Product not Exists')
    }
    const updatedProduct= await Product.findByIdAndUpdate(req.body._id,req.body,{new:true})
    if(!updatedProduct){
        res.status(400)
        throw new Error('Supplier not Exists')
    }
    res.status(200).json(updatedProduct)
})


const deleteProduct = asyncHandler(async(req,res)=>{
    if(!req.params.user_id && !req.params.product_id){
        res.status(400)
        throw new Error('Wrong data recived')
    }
    const user = await User.findById(req.params.user_id);
    if(!user){
        res.status(400)
        throw new Error('User not Found')
    }
    if(user.role ==1){
        res.status(401)
        throw new Error('You are not authorized to delete this product')
    }
    const id=req.params.product_id
    const product= await Product.findById(id)
    if(!product){
        res.status(400)
        throw new Error('Product not Found')
    }
    await product.remove();
    res.status(200).json({msg:'Product removed',_id:id})
})


module.exports={
    getProducts,
    postProduct,
    putProduct,
    deleteProduct
}
