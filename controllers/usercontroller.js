
const User = require('../models/usermodel');
const bcrypt =  require('bcrypt')



exports.createNewUser = async (req, res) => {
    try{
        const{name,email,phonenumber,password} = req.body;
        console.log(name,email,phonenumber,password)

        const user =  await User.findOne({
            where:{
                email
            }
        })
        
        

        const Epassword = await bcrypt.hash(password,10)
        
        if(!user){
            User.create({
                name,
                email,
                phonenumber,
                password: Epassword
            }).then(() => {
                res.json({success:true,message:"Account Created Successfully"})
            }).catch((err) => console.log(err))
        }else{
            res.json({success:false,message:"Email Already Exist Please Login"})
        }
        

 
    }
    catch(err){
        console.error(err);
    }
}

