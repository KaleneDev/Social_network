const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Users = require("./Users.model");

const Likes = sequelize.define("likes", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    article_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});


module.exports = Likes;
