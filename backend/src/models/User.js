const { sequelize, DataTypes } = require('../db/sql');


const User = sequelize.define('User', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
name: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, unique: true, allowNull: false },
password_hash: { type: DataTypes.STRING, allowNull: false },
role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' }
}, { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: false });


module.exports = User;