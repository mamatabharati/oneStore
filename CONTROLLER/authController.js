const RegLogin_model=require('../MODEL/auth');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');//token step 1


exports.postRegDetails=(req,res)=>{
   
    let reg_fname=req.body.r_fname;
    let reg_lname=req.body.r_lname;
    let reg_email=req.body.r_email;
    let reg_password=req.body.r_password;

    if(!reg_fname)
    {
        return res.status(401).json({
            success:false,
            message:"first name required"
        })
    }
    else if(!reg_lname)
    {
        return res.status(401).json({
            success:false,
            message:"last name required"
        })
    }
    else if(!reg_email)
    {
        return res.status(401).json({
            success:false,
            message:"email required"
        })
    }
    else if(!reg_password)
    {
        return res.status(401).json({
            success:false,
            message:"password required"
        })
    }
    else{
        
        RegLogin_model.findOne({email:reg_email})
        .then(userValue=>{
            if(userValue)
            {
               return res.status(401).json({
                   success:false,
                   message:"email already exist"
               })
            }
    
            return bcrypt.hash(reg_password,12)
            .then(hashPassword=>{
                const userData=new RegLogin_model({fname:reg_fname,lname:reg_lname,email:reg_email,password:hashPassword})
                return userData.save()
            }).then(results=>{
                
              return res.status(200).json({
                success:true,
                message:"registration successfull",
                result:results
              })

                }).catch(err=>{
                  return res.status(401).json({
                    success:false,
                    message:"registration unsuccessfull"
                      })
                  })
        }).catch(err=>{
                return res.status(401).json({
                success:false,
                message:"error to register"
            })
        })
    }     
}

exports.postLoginDetails=(req,res)=>{
    const email=req.body.l_email;
    const password=req.body.l_password;
    if(!email)
    {
        return res.status(401).json({
            success:false,
            message:"email required"
        })
    }
    else if(!password)
    {
        return res.status(401).json({
            success:false,
            message:"password required"
        })
    }
    else{
 
        RegLogin_model.findOne({email:email})
       .then(userValue=>{
        if(!userValue)
        {
            return res.status(401).json({
                success:false,
                message:"invalid email"
            })
        }
        bcrypt.compare(password,userValue.password)
        .then(result=>{
            if(!result)
            {
                return res.status(401).json({
                    success:false,
                    message:"invalid password"
                })
            }
            
             console.log("logged in"+result);
             req.session.user=userValue;
            return req.session.save(err=>{
                 if(err)
                 {
                     console.log(err);
                 }
                 else 
                 {
                     const token_jwt=jwt.sign({email:userValue.email},"ABCDE",{expiresIn:'1h'});//token step 2
                    return res.status(201).json({
                        success:true,
                        message:"login successfull",
                        result:userValue,
                        token:token_jwt   //token step 3
                    })
                 }
               
                })  
        }).catch(err=>{
            return res.status(401).json({
                success:false,
                message:err
            })
        })
    }).catch(err=>{
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    })   
 }
}


// exports.getLogOut=(req,res)=>{
//         req.session.destroy();
//         res.redirect('/loginPage');
// }