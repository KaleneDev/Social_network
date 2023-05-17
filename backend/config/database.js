require("dotenv").config();
const { Sequelize } = require("sequelize");
// create connection
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
