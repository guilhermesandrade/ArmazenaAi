const { stockService } = require('../service');

class StockController {
  // Buscar histórico de movimentações
  async getMovementHistory(req, res) {
    try {
      const filters = {
        produto: req.query.produto,
        tipo: req.query.tipo,
        dataInicio: req.query.dataInicio,
        dataFim: req.query.dataFim,
        limit: req.query.limit ? parseInt(req.query.limit) : 100,
      };

      const movements = await stockService.getMovementHistory(filters);

      return res.status(200).json({
        success: true,
        data: movements,
        count: movements.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Buscar movimentações de um produto específico
  async getProductMovements(req, res) {
    try {
      const movements = await stockService.getProductMovements(req.params.productId);

      return res.status(200).json({
        success: true,
        data: movements,
        count: movements.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Buscar estatísticas de movimentação
  async getMovementStats(req, res) {
    try {
      const filters = {
        dataInicio: req.query.dataInicio,
        dataFim: req.query.dataFim,
      };

      const stats = await stockService.getMovementStats(filters);

      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new StockController();
