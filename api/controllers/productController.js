const { productService } = require('../service');

class ProductController {
  // Criar produto
  async createProduct(req, res) {
    try {
      const userId = req.user.id;
      const product = await productService.createProduct(req.body, userId);

      return res.status(201).json({
        success: true,
        message: 'Produto criado com sucesso',
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Buscar todos os produtos
  async getAllProducts(req, res) {
    try {
      const filters = {
        categoria: req.query.categoria,
        genero: req.query.genero,
        tamanho: req.query.tamanho,
        cor: req.query.cor,
        nome: req.query.nome,
      };

      const products = await productService.getAllProducts(filters);

      return res.status(200).json({
        success: true,
        data: products,
        count: products.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Buscar produto por ID
  async getProductById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id);

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Atualizar produto
  async updateProduct(req, res) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);

      return res.status(200).json({
        success: true,
        message: 'Produto atualizado com sucesso',
        data: product,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Deletar produto
  async deleteProduct(req, res) {
    try {
      const result = await productService.deleteProduct(req.params.id);

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

  // Buscar produtos com estoque baixo
  async getLowStockProducts(req, res) {
    try {
      const products = await productService.getLowStockProducts();

      return res.status(200).json({
        success: true,
        data: products,
        count: products.length,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // Atualizar estoque
  async updateStock(req, res) {
    try {
      const { quantidade, tipo, motivo, observacao } = req.body;
      const userId = req.user.id;
      const productId = req.params.id;

      if (!quantidade || !tipo || !motivo) {
        return res.status(400).json({
          success: false,
          message: 'Quantidade, tipo e motivo são obrigatórios',
        });
      }

      const result = await productService.updateStock(
        productId,
        quantidade,
        tipo,
        motivo,
        userId,
        observacao
      );

      return res.status(200).json({
        success: true,
        message: 'Estoque atualizado com sucesso',
        data: result,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new ProductController();
