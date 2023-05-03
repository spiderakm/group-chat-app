const { where } = require("sequelize")
const groupdb=require("../models/group")
const usergroupdb=require("../models/usergroup")

exports.groupNames=async(req,res)=>{
    try{
        const groupname=req.body.groupName
        const data=await groupdb.create({
            nameOfGroup:groupname
        })
        console.log(data);
        const groups=data.dataValues.id
        const response=await usergroupdb.create({
            groupNameId:groups,
            userId:req.user.id,
            isAdmin:true
        })

        res.json({data:data})
    }catch(err){
        console.log("error in creating group BE",err)
        res.json({Error:err})
    }
}

exports.getAllGroupNames=async(req,res)=>{
    try{
        const id=req.user.id
        const data=await usergroupdb.findAll({where:{userId:id}})
        
        const Namearr=[]
        const idarr=[]
        for(let i=0;i<data.length;i++){
            const groupNameId= data[i].dataValues.groupNameId
            const groupName=await groupdb.findAll({where:{id:groupNameId}})
            groupName.forEach((ele2)=>{
                    let name=ele2.dataValues.nameOfGroup
                  let id=ele2.dataValues.id
                    idarr.push(id)
                  Namearr.push(name)
                })
           
        }
        res.json({groupNames:Namearr,groupId:idarr})
    }catch(err){
        console.log("error getAllgroupnames",err)
        res.json({Error:err})
    }
}