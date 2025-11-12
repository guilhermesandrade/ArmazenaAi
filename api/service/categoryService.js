const { Category } = require('../models');

class CategoryService {
  // Criar categoria
  async createCategory(categoryData) {
    try {
      const category = new Category(categoryData);
      await category.save();
      return category;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Categoria já existe');
      }
      throw error;
    }
  }

  // Buscar todas as categorias
  async getAllCategories() {
    try {
      const categories = await Category.find({ ativo: true }).sort({ nome: 1 });
      return categories;
    } catch (error) {
      throw error;
    }
  }

  // Buscar categoria por ID
  async getCategoryById(id) {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw new Error('Categoria não encontrada');
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar categoria
  async updateCategory(id, updateData) {
    try {
      const category = await Category.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!category) {
        throw new Error('Categoria não encontrada');
      }

      return category;
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Categoria já existe');
      }
      throw error;
    }
  }

  // Deletar categoria (soft delete)
  async deleteCategory(id) {
    try {
      const category = await Category.findById(id);
      if (!category) {
        throw new Error('Categoria não encontrada');
      }

      category.ativo = false;
      await category.save();

      return { message: 'Categoria removida com sucesso' };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CategoryService();
