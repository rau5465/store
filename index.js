const express = require("express")
const cors=require('cors')
const  app=express()
const  dotenv= require('dotenv').config()
const connectDB= require('./config/db')
const { errorHandler }= require('./middleWare/errorHandler')
// const { protect }= require('./middleWare/authHandler')
connectDB()
let port=3000;


app.use(express.urlencoded({extended:false}))
app.use(express.json());
app.use(cors({
    origin:'*', 
}))
app.get('/',(req,res)=>{
    res.status(400).json({msg:'Invalid url'})
})
app.use('/api/user',require('./routes/user'))
app.use('/api/category',require('./routes/category'))
app.use('/api/product',require('./routes/product'))
app.use('/api/entry',require('./routes/entry'))
app.use('/api/contact',require('./routes/contact'))
app.use('/api/requirement',require('./routes/requirement'))

app.use(errorHandler);

app.listen(port,()=>console.log(`Server is running on  Port: ${port}`))