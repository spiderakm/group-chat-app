
const User = require('../models/usermodel');
const bcrypt =  require('bcrypt')



exports.createNewUser = async (req, res) => {
    try{
        const userName=req.body.userName
        const phone=req.body.phone
        const email=req.body.email
        const password=req.body.password
       
        if(email==="" || password==="" || userName==="" || phone===""){
            return res.json({success:false,message:"Fill all the fields"})
         }

        const userInfo=await User.findAll({where:{email:email}})

        if(userInfo.length!==0){
             return res.json({success:false,message:"User already exist"})
         }
        
        

        const Epassword = await bcrypt.hash(password,10)
        
        const data=await User.create({
            name:userName,
            phone:phone,
            email:email,
            password:Epassword
        })
        res.json({success:true,data:data,message:"User Created Successfull"})

        

 
    }
    catch(err){
        console.error(err);
    }
}

