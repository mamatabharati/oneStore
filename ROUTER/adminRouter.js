const express=require('express')
const admin_router=express.Router();
const admin_controller=require('../CONTROLLER/adminController');
const Auth_check=require('../middle-ware/isAuth');


admin_router.get('/homepage',admin_controller.getHomepage);

admin_router.get('/add_product',Auth_check,admin_controller.getAddProduct);

admin_router.post('/front_page',admin_controller.post_productData);

admin_router.get('/product_details',admin_controller.get_productDetails);

admin_router.get('/edit_form/:pid',Auth_check,admin_controller.getEditForm);

admin_router.post('/edit_page',admin_controller.postEditData);

admin_router.get('/delete_detail/:pid',admin_controller.getDeleteData);

admin_router.post('/deleteProduct',admin_controller.postDeleteData);

module.exports=admin_router;