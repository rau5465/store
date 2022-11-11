const express = require("express")
const  app=express()
app.get('/',(req,res)=>{
    res.status(200).json({me:12345})

})
app.listen(4000)