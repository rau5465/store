const express=require('express');
const router=express.Router()
const { getContacts, postContact, putContact, deleteContact }=require("../controllers/contactController")

router.route('/').get(getContacts)
router.route('/:id').post(postContact).put(putContact)
router.route('/:user_id/:contact_id').delete(deleteContact);


module.exports=router