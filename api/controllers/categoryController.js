const { categoryService } = require('../service');

class CategoryController {
  // Criar categoria
  async createCategory(req, res) {
    try {
      const category = await categoryService.createCategory(req.body);

      return res.status(201).json({
        success: true,
        message: 'Categoria criada com sucesso',
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Buscar todas as categorias
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();

      return res.status(200).json({
        success: true,
        data: categories,
        count: categories.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Buscar categoria por ID
  async getCategoryById(req, res) {
    try {
      const category = await categoryService.getCategoryById(req.params.id);

      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Atualizar categoria
  async updateCategory(req, res) {
    try {
      const category = await categoryService.updateCategory(req.params.id, req.body);

      return res.status(200).json({
        success: true,
        message: 'Categoria atualizada com sucesso',
        data: category,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Deletar categoria
  async deleteCategory(req, res) {
    try {
      const result = await categoryService.deleteCategory(req.params.id);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new CategoryController();
