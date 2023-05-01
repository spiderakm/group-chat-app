const { json } = require("body-parser")
const messagedb=require("../models/message")
const userdb=require("../models/usermodel")

exports.userMessage=async(req,res)=>{
    try{
        const userMsg=req.body.chat
        const groupId= req.body.groupId
        const data=await messagedb.create({
         message:userMsg,
         userId:req.user.id,
         groupId:groupId
        })
        res.json({data:data})
    }catch(err){
        console.log("error in BE message",err)
        res,json({Error:err})
    } 
}

exports.showMessage=async(req,res)=>{
    try{
       const groupid =req.header("Authorization")
        const data=await messagedb.findAll({where:{groupId:groupid}})
        res.json({allData:data})
    }catch(err){
        console.log("error in showing message on the screen",err)
        res.json({Error:err})
    }
 
}