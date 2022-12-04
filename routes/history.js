const express=require('express');
const router=express.Router()
const { getHistory, postHistory}=require("../controllers/historyController")

router.route('/').get(postHistory);
router.route('/:dated').get(getHistory)

module.exports=router