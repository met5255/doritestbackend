const { Sequelize } = require('sequelize');

const UsersModel = {
    username:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    fullname:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
    }
}

module.exports = { UsersModel }