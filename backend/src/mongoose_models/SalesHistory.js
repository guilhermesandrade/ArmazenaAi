const { mongoose } = require('../db/mongo');
const Schema = mongoose.Schema;


const SalesHistorySchema = new Schema({
product_variant_id: { type: Number, required: true },
date: { type: Date, required: true },
quantity_sold: { type: Number, required: true },
price: { type: Number }
});


module.exports = mongoose.model('SalesHistory', SalesHistorySchema);