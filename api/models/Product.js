const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'],
    trim: true,
  },
  descricao: {
    type: String,
    trim: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Categoria é obrigatória'],
  },
  tamanho: {
    type: String,
    enum: ['PP', 'P', 'M', 'G', 'GG', 'XG', 'Único'],
    required: [true, 'Tamanho é obrigatório'],
  },
  cor: {
    type: String,
    required: [true, 'Cor é obrigatória'],
    trim: true,
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Unissex', 'Infantil'],
    required: [true, 'Gênero é obrigatório'],
  },
  preco: {
    type: Number,
    required: [true, 'Preço é obrigatório'],
    min: [0, 'Preço não pode ser negativo'],
  },
  quantidade: {
    type: Number,
    required: [true, 'Quantidade é obrigatória'],
    min: [0, 'Quantidade não pode ser negativa'],
    default: 0,
  },
  quantidadeMinima: {
    type: Number,
    default: 5,
    min: [0, 'Quantidade mínima não pode ser negativa'],
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  imagem: {
    type: String,
    trim: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Virtual para verificar se está em estoque baixo
productSchema.virtual('estoqueBaixo').get(function() {
  return this.quantidade <= this.quantidadeMinima;
});

// Incluir virtuals no JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
