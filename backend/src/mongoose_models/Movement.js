const { mongoose } = require('../db/mongo');
const Schema = mongoose.Schema;


const MovementSchema = new Schema({
product_variant_id: { type: Number, required: true },
type: { type: String, enum: ['in','out','adjustment','sale'], required: true },
quantity: { type: Number, required: true },
previous_quantity: { type: Number },
new_quantity: { type: Number },
reason: { type: String },
timestamp: { type: Date, default: Date.now },
user_id: { type: Number }
});


module.exports = mongoose.model('Movement', MovementSchema);