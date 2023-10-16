const { Users } = require('../Uitils/sqlConnection');

//const { sequelize } = require('sequelize');
const { Encrypt } = require('../Uitils/password');
//const { jwtToken } = require('../utils/jwtGen');

exports.createUser = async (req, res) => {
    try {
        const { password } = req.body;
        const body = req.body;
        body.password = await Encrypt.cryptPassword(password);
        await Users.create(body);
        // insert into users (id, username, fullanme, password) valuse (null, xy, xy, xy); 
        res.json({ OK: "DONE" })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.getAll = async (req, res) => {
    try {
        const response = await Users.findAndCountAll({
            where: {}, attributes: {
                exclude: ['password']
            },
        });
        // select * from users; 
        res.json(response)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.update = async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params
        await Users.update({ ...body }, { where: { id } });
        // Update set Users where id=1
        res.json({ OK: "DONE" })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.delete = async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params
        await Users.destroy({ where: { id } });
        // delet row uasdnkasdn where id = 1
        res.json({ OK: "DONE" })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;
        const userisExist = await Users.findOne({ where: { "username": username } });
        console.log(userisExist, "------------")
        if (userisExist) {
            const validate = await Encrypt.comparePassword(password, userisExist.dataValues.password);

            if (validate) {
                return res.status(200).json({ message: "Sikeres login" })
            }
        }
        return res.status(401).json({ message: "Bad user login data" })
    } catch (e) {
        return res.status(500).json(e)
    }
}