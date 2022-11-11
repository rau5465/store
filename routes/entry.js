const express=require('express');
const router=express.Router()
const { getEntry, postEntry, putEntry, deleteEntry }=require("../controllers/entryController")

router.route('/').get(getEntry);
router.route('/:id').post(postEntry)
router.route('/:user_id/:entry_id').delete(deleteEntry).put(putEntry);


module.exports=router
