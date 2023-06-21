const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const {v4: uuidv4} = require('uuid');

const Comments = sequelize.define('comments', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
    },
    article_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
    },
    user_id: {
        type: DataTypes.CHAR(36),
        allowNull: false,
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