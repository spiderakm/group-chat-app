const Sequelize=require("sequelize")
const sequelize=require("../utils/db")

const messagedb=sequelize.define("message",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    message:Sequelize.STRING,
    UserId:Sequelize.INTEGER
})

module.exports=messagedb