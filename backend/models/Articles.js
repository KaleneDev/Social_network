const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Comments = require("./Comments");

const Articles = sequelize.define("articles", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    user_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
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

Articles.hasMany(Comments, { foreignKey: "article_id", as: "comments" });
Comments.belongsTo(Articles, { foreignKey: "article_id", as: "articles" });

module.exports = Articles;
