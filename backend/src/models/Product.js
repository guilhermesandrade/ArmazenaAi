const { sequelize, DataTypes } = require('../db/sql');
const Category = require('./Category');


const Product = sequelize.define('Product', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
sku: { type: DataTypes.STRING, unique: true },
name: { type: DataTypes.STRING, allowNull: false },
category_id: { type: DataTypes.INTEGER, allowNull: false },
gender: { type: DataTypes.STRING },
price: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, { tableName: 'products', timestamps: true, createdAt: 'created_at', updatedAt: false });


Product.belongsTo(Category, { foreignKey: 'category_id' });
module.exports = Product;