const mongoose=require('mongoose');
const schemaVariable=mongoose.Schema;

const cartSchema=new schemaVariable({

  productId:{
      type:String,
      required:true
  },
  quantity:{
      type:Number,
      required:true
  },
  userId:{
    type:String,
    required:true
  },
  // totalPrice:{
  //   type:Number,
  //   required:true
  // },
  cart:[{
      type:Object,
      required:true
  }]
});

module.exports=mongoose.model('cartCollection',cartSchema);
