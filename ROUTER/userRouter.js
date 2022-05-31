const express=require('express')
const user_router=express.Router();
const user_controller=require('../CONTROLLER/userController');
const Auth_check=require('../middle-ware/isAuth');


user_router.get('/user_details',user_controller.get_productDetails);

user_router.get('/p_Details/:pid',Auth_check,user_controller.getDetails);

user_router.post('/searchProduct',user_controller.postSearchProduct);

user_router.post('/addToCart',user_controller.postAddToCart);

user_router.get('/cartPage',user_controller.getCartPage);

user_router.post('/deleteCartItem',user_controller.postDeleteCartItem);




module.exports=user_router;