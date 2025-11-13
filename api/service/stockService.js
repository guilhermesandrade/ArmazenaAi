const { StockMovement } = require('../models');

class StockService {
  // Buscar histórico de movimentações
  async getMovementHistory(filters = {}) {
    try {
      const query = {};

      // Aplicar filtros
      if (filters.produto) {
        query.produto = filters.produto;
      }
      if (filters.tipo) {
        query.tipo = filters.tipo;
      }
      if (filters.dataInicio && filters.dataFim) {
        query.createdAt = {
          $gte: new Date(filters.dataInicio),
          $lte: new Date(filters.dataFim),
        };
      }

      const movements = await StockMovement.find(query)
        .populate('produto')
        .populate('usuario', 'nome email')
        .sort({ createdAt: -1 })
        .limit(filters.limit || 100);

      return movements;
    } catch (error) {
      throw error;
    }
  }

  // Buscar movimentações de um produto específico
  async getProductMovements(productId) {
    try {
      const movements = await StockMovement.find({ produto: productId })
        .populate('usuario', 'nome email')
        .sort({ createdAt: -1 });

      return movements;
    } catch (error) {
      throw error;
    }
  }

  // Buscar estatísticas de movimentação
  async getMovementStats(filters = {}) {
    try {
      const query = {};

      if (filters.dataInicio && filters.dataFim) {
        query.createdAt = {
          $gte: new Date(filters.dataInicio),
          $lte: new Date(filters.dataFim),
        };
      }

      const stats = await StockMovement.aggregate([
        { $match: query },
        {
          $group: {
            _id: '$tipo',
            total: { $sum: '$quantidade' },
            count: { $sum: 1 },
          },
        },
      ]);

      return stats;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new StockService();
