const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Users = require("./Users.model");

const Follows = sequelize.define("follows", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        collate: "utf8_general_ci",
    },
    following_id: {
        type: DataTypes.UUID,
        allowNull: false,
        collate: "utf8_general_ci",
    },
    follower_id: {
        type: DataTypes.UUID,
        allowNull: false,
        collate: "utf8_general_ci",
    },
});


module.exports = Follows;
