const asyncHandler =require('express-async-handler')
const User = require('../model/userModel');
const Product = require('../model/productModel');
const History = require('../model/historyModel');
const theDate=(m)=>{
    if(!m){
        m=new Date().getTime();
    }
    let date=new Date(m).getDate();
    let month=new Date(m).getMonth() +1;
    const year=new Date(m).getFullYear();
    const fullDate=year+'/'+month+'/'+date;
    return new Date(fullDate).getTime();
}

const getHistory = asyncHandler(async(req,res)=>{
    const dated=theDate(parseInt(req.params.dated))
    const products= await History.findOne({dated})
    if(!products){
        res.status(400).json({msg:'Backup not found'})
        return
    }
    res.status(200).json(products)
})


const postHistory = asyncHandler(async(req,res)=>{
    const dated=theDate()
    let prods=await History.findOne({dated})
    if(prods){
        res.status(200).json({msg:"History Exists"})
        return
    }
    const products=await Product.find()
    const data={
        dated,
        products
    }
    const result = await History.create(data)
    res.status(201).json({msg:`${products.length} products added to history`});
})


module.exports={
    getHistory,
    postHistory,
}
