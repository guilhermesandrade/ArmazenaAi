const jwt = require('jsonwebtoken');
const { User } = require('../models');

class AuthService {
  // Registrar novo usuário
  async register(userData) {
    try {
      const { email } = userData;

      // Verificar se usuário já existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email já cadastrado');
      }

      // Criar novo usuário (a senha será hasheada automaticamente pelo pre-save hook)
      const user = new User(userData);
      await user.save();

      // Gerar token
      const token = this.generateToken(user);

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  // Login de usuário
  async login(email, senha) {
    try {
      // Buscar usuário
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Credenciais inválidas');
      }

      // Verificar se usuário está ativo
      if (!user.ativo) {
        throw new Error('Usuário inativo');
      }

      // Comparar senha
      const isPasswordValid = await user.comparePassword(senha);
      if (!isPasswordValid) {
        throw new Error('Credenciais inválidas');
      }

      // Gerar token
      const token = this.generateToken(user);

      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  // Gerar token JWT
  generateToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
  }

  // Verificar token
  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}

module.exports = new AuthService();
