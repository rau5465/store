const express=require('express');
const router=express.Router()
const { getCategory, postCategory,  deleteCategory}=require("../controllers/categoryController")

router.route('/').get(getCategory);
router.route('/:id').post(postCategory)
router.route('/:id/:name').delete(deleteCategory);

module.exports=router