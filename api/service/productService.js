const { Product, StockMovement } = require('../models');

class ProductService {
  // Criar produto
  async createProduct(productData, userId) {
    try {
      const product = new Product(productData);
      await product.save();

      // Se houver quantidade inicial, registrar movimentação
      if (product.quantidade > 0) {
        await this.registerStockMovement({
          produto: product._id,
          tipo: 'entrada',
          quantidade: product.quantidade,
          motivo: 'Estoque inicial',
          usuario: userId,
          quantidadeAnterior: 0,
          quantidadeNova: product.quantidade,
        });
      }

      return await product.populate('categoria');
    } catch (error) {
      throw error;
    }
  }

  // Buscar todos os produtos
  async getAllProducts(filters = {}) {
    try {
      const query = { ativo: true };

      // Aplicar filtros
      if (filters.categoria) {
        query.categoria = filters.categoria;
      }
      if (filters.genero) {
        query.genero = filters.genero;
      }
      if (filters.tamanho) {
        query.tamanho = filters.tamanho;
      }
      if (filters.cor) {
        query.cor = new RegExp(filters.cor, 'i');
      }
      if (filters.nome) {
        query.nome = new RegExp(filters.nome, 'i');
      }

      const products = await Product.find(query)
        .populate('categoria')
        .sort({ createdAt: -1 });

      return products;
    } catch (error) {
      throw error;
    }
  }

  // Buscar produto por ID
  async getProductById(id) {
    try {
      const product = await Product.findById(id).populate('categoria');
      if (!product) {
        throw new Error('Produto não encontrado');
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar produto
  async updateProduct(id, updateData) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error('Produto não encontrado');
      }

      // Atualizar campos
      Object.keys(updateData).forEach(key => {
        if (key !== 'quantidade') { // quantidade só pode ser atualizada via movimentação
          product[key] = updateData[key];
        }
      });

      await product.save();
      return await product.populate('categoria');
    } catch (error) {
      throw error;
    }
  }

  // Deletar produto (soft delete)
  async deleteProduct(id) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        throw new Error('Produto não encontrado');
      }

      product.ativo = false;
      await product.save();

      return { message: 'Produto removido com sucesso' };
    } catch (error) {
      throw error;
    }
  }

  // Buscar produtos com estoque baixo
  async getLowStockProducts() {
    try {
      const products = await Product.find({
        ativo: true,
        $expr: { $lte: ['$quantidade', '$quantidadeMinima'] }
      }).populate('categoria');

      return products;
    } catch (error) {
      throw error;
    }
  }

  // Registrar movimentação de estoque
  async registerStockMovement(movementData) {
    try {
      const movement = new StockMovement(movementData);
      await movement.save();
      return movement;
    } catch (error) {
      throw error;
    }
  }

  // Atualizar quantidade de produto via movimentação
  async updateStock(productId, quantidade, tipo, motivo, userId, observacao = '') {
    try {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Produto não encontrado');
      }

      const quantidadeAnterior = product.quantidade;
      let quantidadeNova;

      if (tipo === 'entrada') {
        quantidadeNova = quantidadeAnterior + quantidade;
      } else if (tipo === 'saida') {
        if (quantidadeAnterior < quantidade) {
          throw new Error('Quantidade insuficiente em estoque');
        }
        quantidadeNova = quantidadeAnterior - quantidade;
      } else {
        throw new Error('Tipo de movimentação inválido');
      }

      // Atualizar quantidade do produto
      product.quantidade = quantidadeNova;
      await product.save();

      // Registrar movimentação
      const movement = await this.registerStockMovement({
        produto: productId,
        tipo,
        quantidade,
        motivo,
        usuario: userId,
        observacao,
        quantidadeAnterior,
        quantidadeNova,
      });

      return {
        product: await product.populate('categoria'),
        movement,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductService();
