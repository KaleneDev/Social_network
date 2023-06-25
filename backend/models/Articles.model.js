const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Comments = require("./Comments.model");

const Articles = sequelize.define("articles", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        collate: "utf8_bin",
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        collate: "utf8_bin",
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    file: {
        type: DataTypes.STRING,
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

Articles.hasMany(Comments, {
    foreignKey: "article_id",
    as: "comments",
    onDelete: "CASCADE",
});

Comments.belongsTo(Articles, { foreignKey: "article_id", as: "articles" });

module.exports = Articles;
