const mongoose=require('mongoose');
const SchemaVariable=mongoose.Schema;

const ProductSchema=new SchemaVariable({
    p_brand:{
        type:String,
       required:true
    },
    p_title:{
       type:String,
       required:true
    },
    p_price:{
        type:Number,
        required:true
    },
    p_desc:{
        type:String,
        required:true
    },
    p_image:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('ProductCollection',ProductSchema)//database collection name,schema name