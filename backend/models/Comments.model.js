const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const Comments = sequelize.define("comments", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        collate: "utf8_bin",
    },
    article_id: {
        type: DataTypes.UUID,
        allowNull: false,
        collate: "utf8_bin",
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        collate: "utf8_bin",
    },
    file: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
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

module.exports = Comments;
