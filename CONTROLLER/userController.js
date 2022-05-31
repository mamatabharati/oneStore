const ProductModel=require('../MODEL/product');
const cartModel=require('../MODEL/cart');
    
exports.get_productDetails=(req,res)=>{
    ProductModel.find()
    .then(Products=>{
        res.render('User/viewProductUser',{  
             titlepage:"all product",
                 data:Products,
                 path:'/user_details'
             })
    })
    .catch(err=>{
        console.log("data not fetched",err);
    })
}

exports.getDetails=(req,res)=>{
    let product_id=req.params.pid;
    console.log("product id",product_id);
    ProductModel.findById(product_id)
    .then(product=>{
res.render('User/productDetails',{
    titlepage:"product details",
    data:product,
    path:'/p_Details/:pid'
})
    }).catch(err=>{
        console.log("product not found",err);
    })
}

exports.postSearchProduct=(req,res)=>{
    const s_text=req.body.searchId;
    console.log("searchId:",s_text);
    ProductModel.find({p_title:{$regex:s_text,$options:'i'}})
    //$regex:Provides regular expression capabilities for pattern matching strings in queries.
    //The $options with ‘i’ parameter means case insensitivity
    .then(result=>{
        res.render('User/viewProductUser',{
            titlepage:"search product",
            path:'/searchProduct',
            data:result
        })
    })
    .catch(err=>{
        console.log("product not found",err);
    })
}

exports.postAddToCart=(req,res)=>{
    const pId=req.body.productId;
    const quantity=req.body.quantity;
    const userId=req.user._id;
    // const totalPrice=req.body.p_price;
    const cartValue=[];
    console.log("Add to cart: pId:",pId,"Q:",quantity,"Id:",userId);

    cartModel.find({userId:userId,productId:pId})
    .then(cartData=>{
        if(cartData==' ')//if cart is empty-->find pId-->push-->save 
        {
            ProductModel.findById(pId)
            .then(productForCart=>{
                cartValue.push(productForCart);
                const cartProduct=new cartModel({productId:pId,quantity:quantity,userId:userId,cart:cartValue});
                cartProduct.save()
                .then(result=>{
                    console.log("product added successfully");
                    res.redirect('/cartPage');
                }).catch(err=>{
                    console.log(err);
                })
            }).catch(err=>{
                console.log(err);
            })
        }
        else{

            ProductModel.findById(pId)
            .then(productForCart=>{
                // let existingProduct=cartModel.findById({_id:pId})
                // if(existingProduct>0)
                // {
                //    quantity+=quantity;
                // }
                // else{
                cartValue.push(productForCart);
                const cartProduct=new cartModel({productId:pId,quantity:quantity,userId:userId,cart:cartValue});
                cartProduct.save()
                
                .then(result=>{
                    console.log("product added successfully");
                    res.redirect('/cartPage');
                }).catch(err=>{
                    console.log(err);
                })
            // }
            }).catch(err=>{
                console.log(err);
            })
        
        }
    }).catch(err=>{
        console.log("product cannot be added");
    })
}

exports.getCartPage=(req,res)=>{
    const user_id=req.session.user._id;
    cartModel.find({userId:user_id})
    .then(viewProductsCart=>{
        res.render('User/cartPage',{
            titlepage:"cart",
            path:'/cartPage',
            data:viewProductsCart
        });
    }).catch(err=>{
        console.log(err);
    })
}

exports.postDeleteCartItem=(req,res)=>{
    const product_id=req.body.delete_id;
    console.log("cart product id:",product_id);
    cartModel.deleteOne({_id:product_id})
    .then(result=>{
        console.log(result);
        res.redirect('/cartPage');
    })
    .catch(err=>{
        console.log("error at deleting",err);
    })
}