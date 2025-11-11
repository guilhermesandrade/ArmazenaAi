const { sequelize, DataTypes } = require('../db/sql');
const Product = require('./Product');


const ProductVariant = sequelize.define('ProductVariant', {
id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
product_id: { type: DataTypes.INTEGER, allowNull: false },
size: { type: DataTypes.STRING },
color: { type: DataTypes.STRING },
quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
barcode: { type: DataTypes.STRING }
}, { tableName: 'product_variants', timestamps: true, createdAt: 'created_at', updatedAt: false });


ProductVariant.belongsTo(Product, { foreignKey: 'product_id' });
module.exports = ProductVariant;