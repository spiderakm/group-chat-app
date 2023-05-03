const { json } = require("body-parser")
const messagedb=require("../models/message")
const userdb=require("../models/usermodel")
const usergroupdb = require('../models/usergroup')

exports.userMessage=async(req,res)=>{
    try{
        const userMsg=req.body.chat
        const groupId= req.body.groupId
        if(userMsg===""){
            return res.json({succes:false,messsage:"message field empty"})
        }
        const data=await messagedb.create({
         message:userMsg,
         userId:req.user.id,
         groupId:groupId,
         userName:req.user.name
        })
        res.json({data:data})
    }catch(err){
        console.log("error in BE message",err)
        res,json({Error:err})
    } 
}
let groupid;
exports.showMessage=async(req,res)=>{
    try{
        groupid =req.header("Authorization")
        const data=await messagedb.findAll({where:{groupId:groupid}})
        res.json({allData:data})
    }catch(err){
        console.log("error in showing message on the screen",err)
        res.json({Error:err})
    }
}

exports.getAllUsers=async(req,res)=>{
    try{
        const data=await userdb.findAll()
        res.json({allUser:data})
    }catch(err){
        console.log("get All the users error",err)
        res.json({Error:err})
    }
}

exports.addToGroup=async(req,res)=>{
    try{
       const userId= req.body.userId
        const groupId= req.body.groupId
       
        const data=await usergroupdb.create({
            userId:userId,
            groupNameId:groupId
        })   
        res.json({groupAdd:data})
    }catch(err){
        console.log("error in add to group",err)
    }
}

//get the users from the group
exports.getpreferedUsers=async(req,res)=>{
    try{
        const userId=req.user.id
    
      const data= await usergroupdb.findAll({where:{groupNameId:groupid}})
        let arr=[]
        for(let i=0;i<data.length;i++){
         const id=data[i].dataValues.userId
         const data2=await userdb.findOne({where:{id:id}})
          arr.push(data2.dataValues)
        }
        res.json({allUser:arr,isAdmin:data})
    }catch(err){
        console.log("error in get prefered users",err)
    }
}

//remove from the members 
exports.removeMember=async(req,res)=>{
    try{
        const userId= req.body.userId
        const groupId=req.body.groupId
         const data=await usergroupdb.findOne({where:{userId:userId,groupNameId:groupId}})
         data.destroy()
        
    }catch(err){
        console.log("error in remove members",err)
        res.json({Error:err})
    }   
}