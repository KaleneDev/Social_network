const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Articles = require("./Articles.model");
const Comments = require("./Comments.model");
const Follows = require("./Follow.model");
const Likes = require("./Likes.model");

const Users = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        minLenght: 3,
        maxLenght: 20,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        validate: {
            isEmail: { isEmail: true },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        minLenght: 6,
        maxLenght: 20,
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: "default.png",
        allowNull: true,
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

Users.hasMany(Follows, {
    foreignKey: "follower_id",
    as: "Following",
    onDelete: "CASCADE",
});
Users.hasMany(Follows, {
    foreignKey: "following_id",
    as: "Follower",
    onDelete: "CASCADE",
});

Follows.belongsTo(Users, { foreignKey: "follower_id", as: "follower" });
Follows.belongsTo(Users, { foreignKey: "following_id", as: "following" });

Articles.belongsTo(Users, { foreignKey: "user_id", as: "users" });
Comments.belongsTo(Users, { foreignKey: "user_id", as: "users" });

Users.hasMany(Likes, {
    foreignKey: "user_id",
    as: "likes",
    onDelete: "CASCADE",
});

Likes.belongsTo(Users, { foreignKey: "user_id", as: "users" });

module.exports = Users;
