const asyncHandler =require('express-async-handler')
const User = require('../model/userModel');
const Entry = require('../model/entryModel');
const Contact = require('../model/contactModel');
const Product = require('../model/productModel');

const getEntry = asyncHandler(async(req,res)=>{
    const entry= await Entry.find().select('-__v')
    res.status(200).json(entry)
})

const postEntry= asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(400)
        throw new Error('User Not found')
    }
    if(user.role ==1){
        res.status(401)
        throw new Error('You are not authorized to add a product')
    }

    const {products,billNumber,details,gstno ,contactId, dated, type,contactName,igstr,sgstr,cgstr, igst,sgst,cgst,shippingCost,totalCost }=req.body
    let contact
    if(contactId){
        contact = await Contact.findById(contactId);
        if(!contact){
            res.status(400)
            throw new Error('Contact not found')
        }
    }
    let ids=[];

   let products2=JSON.parse(products)
    products2.map(c=>{
        ids.push(c._id)
    })
    let records = await Product.find({ '_id': { $in: ids } });
 
    records.map((product,index)=>{
        const data=products2.filter(c=>c._id==product._id)[0]
      
        records[index].updatedAt=new Date().getTime()
        if(type=='recieved'){
            records[index].qty +=parseFloat(data.qty)
            records[index].rate =parseFloat(data.rate)
        }else{
            records[index].qty -=parseFloat(data.qty)
            if(records[index].used){
                records[index].used +=parseFloat(data.qty)
            }else{
                records[index].used=parseFloat(data.qty)
            }
        }
        records[index].updatedBy=user.id
        records[index].ownerName=user.name
    })
    const bulkOps = records.map(obj => {
        return {
          updateOne: {
            filter: {
              _id: obj._id
            },
            update: {
                qty:obj.qty,
                used:obj.used,
                rate:obj.rate

            }
          }
        }
      })
      const ress= await Product.bulkWrite(bulkOps)
      if(!ress){
        res.status(400)
        throw new Error('All Products or some not updated')
      }
      ////// edit from here
      let data={
        products:products2,
        billNumber,
        contactId,
        gstno,
        contactName,
        details,
        qty:products2.length,
        type,
        createdBy:user.id,
        ownerName:user.name,
        cgst,
        sgst,
        igst,
        igstr,
        cgstr,
        sgstr,
        shippingCost,
        totalCost,
        dated
      }
     
    let result = await Entry.create(data)
    if(!result){
        res.status(400)
        throw new Error('Can not create Entry')
    }
    res.status(200).json(result);
    
})

const putEntry= asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.user_id);
    if(!user){
        res.status(400)
        throw new Error('User Not found')
    }
    if(user.role ==1){
        res.status(401)
        throw new Error('You are not authorized to add a product')
    }
    
    const entry= await Entry.findById(req.params.entry_id)
    if(!entry){
        res.status(400)
        throw new Error('Entry not Exists')
    }
    if(req.body.qty && req.body.qty!=entry.qty){
        const product= await Product.findById(entry.productId);
        let val=parseFloat(product.qty);
        val=parseFloat(val)-parseFloat(entry.qty);
        val=parseFloat(val)+parseFloat(req.body.qty)
        const updateProduct=await Product.findByIdAndUpdate(entry.productId,{qty:val},{new:true})
        if(!updateProduct){
            res.status(400)
            throw new Error('Product Not Updated')
        }
    }

    let data=req.body;
    data.updatedBy=user.id
    data.updateTime=new Date().getTime()
    const updatedEntry= await Entry.findByIdAndUpdate(req.params.entry_id,data,{new:true})
    if(!updatedEntry){
        res.status(400)
        throw new Error('Entry not Exists')
    }
    res.status(200).json(updatedEntry)
})


const deleteEntry = asyncHandler(async(req,res)=>{
    if(!req.params.user_id && !req.params.Entry_id){ 
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
    const id=req.params.entry_id
    const entry= await Entry.findById(id)
    if(!entry){
        res.status(400)
        throw new Error('Entry not Found')
    }
    await Entry.remove();
    res.status(200).json({msg:'Entry removed'})
})


module.exports={
    getEntry,
    postEntry,
    deleteEntry,
    putEntry
}
