const express=require('express');
const router=express.Router()
const { getRequirement, postRequirement, deleteRequirement }=require("../controllers/requirementController")

router.route('/').get(getRequirement);
router.route('/:id').post(postRequirement)
router.route('/:user_id/:requirement_id').delete(deleteRequirement);


module.exports=router
