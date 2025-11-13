const { sequelize, DataTypes } = require('../db/sql');


const Category = sequelize.define('Category', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING, unique: true, allowNull: false },
description: { type: DataTypes.STRING }
}, { tableName: 'categories', timestamps: true, createdAt: 'created_at', updatedAt: false });


module.exports = Category;