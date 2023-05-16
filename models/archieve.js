const Sequelize=require("sequelize")
const sequelize=require("../utils/db")

const archeivedb=sequelize.define("archeivechat",{
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

module.exports=archeivedb