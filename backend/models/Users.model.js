const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Articles = require("./Articles.model");
const Comments = require("./Comments.model");
const { isEmail } = require("validator");

const Users = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        validate: {
            isEmail: { isEmail: true },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

Users.hasMany(Articles, { foreignKey: "user_id", as: "articles" });
Users.hasMany(Comments, { foreignKey: "user_id", as: "comments" });
Articles.belongsTo(Users, { foreignKey: "user_id", as: "users" });
Comments.belongsTo(Users, { foreignKey: "user_id", as: "users" });

module.exports = Users;
