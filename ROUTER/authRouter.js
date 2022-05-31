const express=require('express')
const auth_router=express.Router();
const auth_controller=require('../CONTROLLER/authController');
const Auth_check=require('../middle-ware/isAuth');

// auth_router.get('/registration',auth_controller.getRegPage);

// auth_router.get('/loginPage',auth_controller.getLoginPage);

auth_router.post('/reg_page',auth_controller.postRegDetails);

auth_router.post('/login',auth_controller.postLoginDetails);

// auth_router.get('/logOut',auth_controller.getLogOut);








module.exports=auth_router;