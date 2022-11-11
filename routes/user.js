const express=require('express');
const router=express.Router()
const { getUsers, login, register, deleteUser,getUserById,resetUser,changePassword }=require("../controllers/userController")
const { protect }=require('../middleWare/authHandler')
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/changepassword").post(changePassword);
router.route("/users").get(getUsers);
router.route("/:id").get(getUserById);
router.route("/:admin_id/:user_id").get(deleteUser);
router.route("/reset/:admin_id/:user_id").get(resetUser);



module.exports=router
