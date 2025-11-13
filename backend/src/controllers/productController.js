const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');
const Category = require('../models/Category');


async function createProduct(req,res){
const { name, sku, category_id, price, gender, variants } = req.body;
if(!name || !price || !category_id) return res.status(400).json({ error: 'Missing fields' });
const product = await Product.create({ name, sku, category_id, price, gender });
if(Array.isArray(variants)){
for(const v of variants){
await ProductVariant.create({ product_id: product.id, size: v.size, color: v.color, quantity: v.quantity || 0, barcode: v.barcode });
}
}
return res.status(201).json({ product });
}


async function listProducts(req,res){
const { page = 1, limit = 20, category, gender, q } = req.query;
const where = {};
if(category) where.category_id = category;
if(gender) where.gender = gender;
if(q) where.name = { [require('sequelize').Op.like]: `%${q}%` };
const products = await Product.findAll