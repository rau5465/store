const express=require('express');
const router=express.Router()
const { getProducts, postProduct, deleteProduct, putProduct }=require("../controllers/productController")

router.route('/').get(getProducts).post(postProduct);
router.route('/:id').put(putProduct);
router.route('/:user_id/:product_id').delete(deleteProduct);


module.exports=router