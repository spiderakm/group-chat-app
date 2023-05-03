const Sequelize=require("sequelize")
const sequelize=require("../utils/db")

const usergroupdb=sequelize.define("usergroup",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    groupNameId:Sequelize.INTEGER,
    userId:Sequelize.INTEGER,
    isAdmin:Sequelize.BOOLEAN
})

module.exports=usergroupdb