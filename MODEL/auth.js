const mongoose=require('mongoose');
const SchemaVariable=mongoose.Schema;

const authSchema=new SchemaVariable({
    fname:{
        type:String,
        required:true
     },
     lname:{
         type:String,
         required:true
     },
     email:{
         type:String,
         required:true
     },
     password:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Auth_RegData',authSchema);