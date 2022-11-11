const asyncHandler =require('express-async-handler')
const User = require('../model/userModel');
const Contact = require('../model/contactModel');

const getContacts = asyncHandler(async(req,res)=>{
    const contact= await Contact.find().select('-__v')
    res.status(200).json(contact)
})

const postContact= asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User Not found')
    }
    if(user.role ==1){
        res.status(401)
        throw new Error('You are not authorized to add a Contact')
    }
    const {name}=req.body
    let data={
       name,
       createdBy:user.id,
       ownerName:user.name
    }
    if(req.body.email){
        data.email=req.body.email
    }
    if(req.body.mobile){
        data.mobile=req.body.mobile
    }
    if(req.body.address){
        data.address=req.body.address
    }
    if(req.body.gstno){
        data.gstno=req.body.gstno
    }
    if(req.body.contactPerson){
        data.contactPerson=req.body.contactPerson
    }
    const contact= await Contact.findOne({name:data.name})
    if(contact){
        res.status(400)
        throw new Error('Suplier Already Exists')
    }
    const result = await Contact.create(data)
    if(!result){
        res.status(400)
        throw new Error('Can not create Suplier')
    }
    res.status(200).json(result);
})

const putContact= asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User Not found')
    }
    if(user.role ==1){
        res.status(401)
        throw new Error('You are not authorized to add a Contact')
    }
    
    const contact= await Contact.findById(req.body._id)
    if(!contact){
        res.status(400)
        throw new Error('Supplier not Exists')
    }
    const updatedContact= await Contact.findByIdAndUpdate(req.body._id,req.body,{new:true})
    if(!updatedContact){
        res.status(400)
        throw new Error('Supplier not Exists')
    }
    res.status(200).json(updatedContact)
})


const deleteContact = asyncHandler(async(req,res)=>{
    if(!req.params.user_id && !req.params.contact_id){
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
        throw new Error('You are not authorized to delete this Suplier')
    }
    const id=req.params.contact_id
    const contact= await Contact.findById(id)
    if(!contact){
        res.status(400)
        throw new Error('Suplier not Found')
    }
    await contact.remove();
    res.status(200).json({msg:'contact removed',_id:id})
})


module.exports={
    getContacts,
    postContact,
    deleteContact,
    putContact
}
