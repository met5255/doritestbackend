const { Sequelize } = require('sequelize');
const {UsersModel} = require('../Models/UsersModel');
const {UserRolesModel} = require('../Models/UserRolesModel');

const sequelize = new Sequelize({
    dialect: 'sqlite',//postgre, mongodb,mysql, jdbc
    storage: 'db/database.sqlite',
    logging: console.log,
});

const Users = sequelize.define("Users", UsersModel);
const UserRoles = sequelize.define("UserRole", UserRolesModel);

Users.belongsTo(UserRoles);
UserRoles.hasMany(Users);

const connChecnk = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await syncDb([Users, UserRoles]);
        console.log('Generate table.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

connChecnk();

const syncDb = async (dbsModel) => {
    dbsModel.forEach(model => {
        model.sync().then(() => {
            console.log(`${model.tableName} reated successfully`);
        }).catch((error) => {
            console.error(`Unable to create table: ${model.tableName}`);
        });
    });
}

module.exports = { sequelize, Users, UserRoles };