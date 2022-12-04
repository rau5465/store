const asyncHandler =require('express-async-handler')
const User = require('../model/userModel');
const Product = require('../model/productModel');
const Requirement = require('../model/requirementModel');

const getRequirement= asyncHandler(async(req,res)=>{
    const requirement= await Requirement.find()
    res.status(200).json(requirement.reverse())
})

const postRequirement= asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User Not found')
    }
    if(user.role ==1){
        res.status(401)
        throw new Error('You are not authorized to add a product')
    }

    const {products,remarks,demandBy,dated,category,totalCost }=req.body
    let products2=JSON.parse(products)
    
      ////// edit from here
      let data={
        products:products2,
        remarks,
        demandBy,
        createdBy:user.id,
        ownerName:user.name,
        category,
        totalCost,
        dated
      }
     
    let result = await Requirement.create(data)
    if(!result){
        res.status(400)
        throw new Error('Can not create Requirement')
    }
    res.status(200).json(result);
    
})


const deleteRequirement = asyncHandler(async(req,res)=>{
    if(!req.params.user_id && !req.params.requirement_id){ 
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
    const id=req.params.requirement_id
    const requirement= await Requirement.findById(id)
    if(!requirement){
        res.status(400)
        throw new Error('Requirement not Found')
    }
    await requirement.remove();
    res.status(200).json({msg:'Requirement removed',_id:id})
})


module.exports={
    getRequirement,
    postRequirement,
    deleteRequirement,
}
