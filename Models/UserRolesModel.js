
const { Sequelize } = require('sequelize');

const UserRolesModel = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    }
};

module.exports = { UserRolesModel };