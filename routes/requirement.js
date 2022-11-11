const express=require('express');
const router=express.Router()
const { getRequirement, postRequirement, putRequirement, deleteRequirement }=require("../controllers/requirementController")

router.route('/').get(getRequirement);
router.route('/:id').post(postRequirement)
router.route('/:user_id/:entry_id').delete(deleteRequirement).put(putRequirement);


module.exports=router
