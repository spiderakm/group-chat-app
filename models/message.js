const Sequelize=require("sequelize")
const sequelize=require("../utils/db")

const messagedb=sequelize.define("message",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    message:Sequelize.STRING,
    userId:Sequelize.INTEGER,
    groupId:Sequelize.INTEGER,
    userName:Sequelize.STRING
})

module.exports=messagedb