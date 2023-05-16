require("dotenv").config();
const { Sequelize } = require('sequelize');
// create connection
const sequelize = new Sequelize("forum", "root", "root", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;
