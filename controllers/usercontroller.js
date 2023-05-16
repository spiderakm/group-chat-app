
const User = require('../models/usermodel');
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();
function genrateToken(id){
    return jwt.sign({ UserId : id },process.env.JWT_SECRET_KEY)
}

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


exports.authenticateUser = async (req,res) => {
    try {
        const user = await User.findOne({
            where:{
                email:req.body.email
            }
        });
        if(!user){
            res.json({success:false,message:"User not found please Signup"})
        }else{
            const passwordMatch = await bcrypt.compare(req.body.password,user.password)
            if(passwordMatch){ 
                res.json({success:"Successfully logged In", token : genrateToken(user.id)})
            }else{
                res.json({success:false,message:"Wrong Email or Password"})
            }
        }

    } catch (error) {
        console.log(error);
    }
}