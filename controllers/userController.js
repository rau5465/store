const bcrypt =require('bcryptjs')
const jwt =require('jsonwebtoken')
const asyncHandler =require('express-async-handler')
const User = require('../model/userModel');

const getUsers = asyncHandler(async(req,res)=>{
    const users= await User.find().select('-password').select('-__v')
    res.status(200).json(users)
})

const getUserById = asyncHandler(async(req,res)=>{
    const user= await User.findById(req.params.id).select('-__v').select('-password')
    if(!user){
        res.status(400)
        throw new Error('User not Found')
    }
    res.status(200).json(user)
})

const register = asyncHandler(async(req,res)=>{
    const { name, email, role}=req.body;
    if(!name || !email || !role){
        res.status(400)
        throw new Error('name or email or password is missing')
    }
    const users= await User.findOne({email})
    if(users){
        res.status(400)
        throw new Error('User with email already exits')
    }

    const salt= await bcrypt.genSalt(10)
    const hashPass= await bcrypt.hash('123456',salt);
    let data={
        name,
        email,
        role,
        password:hashPass,
    }
    const user = await User.create(data)
    if(user){
        res.status(200).json({
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})


const login = asyncHandler(async(req,res)=>{
    const { email, password}=req.body
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
          role:user.role
        })
    }else{
        res.status(401)
        throw new Error('Email or password is incorrect')
    }
})

const putUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User not Found')
    }
    const updatedUser= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedUser)
})

const resetUser = asyncHandler(async(req,res)=>{
    const admin = await User.findById(req.params.admin_id);
    if(!admin){
        res.status(400)
        throw new Error('Admin not Found')
    }
    if(admin.role!=3){
        res.status(400)
        throw new Error('You are not admin. You can not reset User password')
    }
    const user = await User.findOne({email:req.params.user_id});
    if(!user){
        res.status(400)
        throw new Error('User not Found')
    }
    const salt= await bcrypt.genSalt(10)
    const hashPass= await bcrypt.hash('123456',salt);
    let data={
        password:hashPass
    }
    const updatedUser= await User.findByIdAndUpdate(user._id,data,{new:true})
    res.status(200).json({msg:'Password Reset Completed'})
})

const changePassword = asyncHandler(async(req,res)=>{
    const { email, password, newPassword}=req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(400)
        throw new Error('User not Found')
    }
    if(!await bcrypt.compare(password,user.password)){
        res.status(401)
        throw new Error('Wrong Password')
    }
    const salt= await bcrypt.genSalt(10)
    const hashPass= await bcrypt.hash(newPassword,salt);
    let data={
        password:hashPass
    }
    const updatedUser= await User.findByIdAndUpdate(user._id,data,{new:true})
    res.status(200).json({msg:'Password Changed'})
})


const deleteUser = asyncHandler(async(req,res)=>{
    const admin = await User.findById(req.params.admin_id);
    if(!admin){
        res.status(400)
        throw new Error('User not Found')
    }
    if(admin.role!=3){
        res.status(400)
        throw new Error('You are not autherised to delete a user')
    }
    const user = await User.findById(req.params.user_id);
    if(!user){
        res.status(400)
        throw new Error('User not Found')
    }
    await user.remove();
    res.status(200).json({id:req.params.user_id})
})

// const auth=(id)=>{
// return jwt({id},process.env.JWT_SECRET,{expiresIn:'30d'})
// }

module.exports={
    login,
    register,
    getUsers,
    getUserById,
    resetUser,
    changePassword,
    putUser,
    deleteUser
}
