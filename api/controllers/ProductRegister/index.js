const productService = require("../service");

async function createProduct(req, res) {
  try {
    const { name, cost, price } = req.body;

    const newProduct = await productService.createProduct({ name, cost, price });

    return res.status(201).json({ message: "Produto cadastrado com sucesso!", data: newProduct });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao cadastrar produto", error: error.message });
  }
}

async function getProducts(req, res) {
  try {

    const products = await productService.getProducts();

    return res.status(201).json({ message: "Produto cadastrado com sucesso!", data: products });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao buscar produtos", error: error.message });
  } 
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.param

    const products = await productService.deleteProduct({ id });

    return res.status(201).json({ message: "Produto deletado com sucesso!", data: products });
  } catch (error) {
    return res.status(500).json({ message: "Erro ao deletar produtos", error: error.message });
  } 
}

module.exports = {
  createProduct,
  getProducts,
  deleteProduct
};
