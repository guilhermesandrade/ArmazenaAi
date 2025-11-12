const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Produto é obrigatório'],
  },
  tipo: {
    type: String,
    enum: ['entrada', 'saida'],
    required: [true, 'Tipo de movimentação é obrigatório'],
  },
  quantidade: {
    type: Number,
    required: [true, 'Quantidade é obrigatória'],
    min: [1, 'Quantidade deve ser maior que zero'],
  },
  motivo: {
    type: String,
    required: [true, 'Motivo é obrigatório'],
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Usuário é obrigatório'],
  },
  observacao: {
    type: String,
    trim: true,
  },
  quantidadeAnterior: {
    type: Number,
    required: true,
  },
  quantidadeNova: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

// Index para melhorar consultas por produto e data
stockMovementSchema.index({ produto: 1, createdAt: -1 });

const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

module.exports = StockMovement;
