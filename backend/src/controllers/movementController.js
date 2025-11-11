const Movement = require('../models/movementModel');
const Product = require('../models/productModel');


exports.createMovement = async (req, res) => {
try {
const { productId, type, quantity } = req.body;


const product = await Product.findById(productId);
if (!product) return res.status(404).json({ message: 'Produto não encontrado' });


if (type === 'saida' && product.quantity < quantity) {
return res.status(400).json({ message: 'Quantidade insuficiente em estoque' });
}


const movement = await Movement.create({ productId, type, quantity });


if (type === 'entrada') product.quantity += quantity;
else if (type === 'saida') product.quantity -= quantity;


await product.save();
res.status(201).json(movement);
} catch (error) {
res.status(500).json({ message: error.message });
}
};


exports.getMovements = async (req, res) => {
try {
const movements = await Movement.find().populate('productId', 'name category');
res.status(200).json(movements);
} catch (error) {
res.status(500).json({ message: error.message });
}
};