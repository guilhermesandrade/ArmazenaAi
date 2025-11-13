const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor, forneça um email válido'],
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
  },
  role: {
    type: String,
    enum: ['admin', 'gerente', 'funcionario'],
    default: 'funcionario',
  },
  ativo: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) {
    return next();
  }

  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    this.senha = await bcrypt.hash(this.senha, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.senha);
};

// Remover senha do JSON
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.senha;
  return obj;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
