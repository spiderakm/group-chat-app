const Sequelize = require('sequelize')
const sequelize = require('../utils/db')

const User = sequelize.define('User',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNul : false
    },
    name : {
        type : Sequelize.STRING,
        allowNul : false
    },
    email : {
        type : Sequelize.STRING,
        unique : true,
        allowNul : false
    },
    phonenumber : {
        type: Sequelize.STRING,
        validate: {
          len: [10, 20],
          isNumeric: true
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNul : false
    }
})

module.exports = User;