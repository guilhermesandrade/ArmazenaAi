const aiService = require('../service/aiService');

class AIController {
  // Prever demanda de um produto
  async predictDemand(req, res) {
    try {
      const { productId } = req.params;
      const { days = 30 } = req.query;

      const prediction = await aiService.predictDemand(productId, parseInt(days));

      return res.status(200).json({
        success: true,
        data: prediction,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Obter sugestões de reposição
  async getReplenishmentSuggestions(req, res) {
    try {
      const suggestions = await aiService.getReplenishmentSuggestions();

      return res.status(200).json({
        success: true,
        data: suggestions,
        count: suggestions.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AIController();
