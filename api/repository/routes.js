const express = require('express');
const { authMiddleware } = require('../middlewares');
const {
  authController,
  productController,
  categoryController,
  stockController,
} = require('../controllers');
const aiController = require('../controllers/aiController');

const router = express.Router();

// ========== Rotas de Autentica��o (p�blicas) ==========
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// ========== Rotas de Perfil (protegidas) ==========
router.get('/auth/profile', authMiddleware, authController.getProfile);

// ========== Rotas de Categorias (protegidas) ==========
router.post('/categories', authMiddleware, categoryController.createCategory);
router.get('/categories', authMiddleware, categoryController.getAllCategories);
router.get('/categories/:id', authMiddleware, categoryController.getCategoryById);
router.put('/categories/:id', authMiddleware, categoryController.updateCategory);
router.delete('/categories/:id', authMiddleware, categoryController.deleteCategory);

// ========== Rotas de Produtos (protegidas) ==========
router.post('/products', authMiddleware, productController.createProduct);
router.get('/products', authMiddleware, productController.getAllProducts);
router.get('/products/low-stock', authMiddleware, productController.getLowStockProducts);
router.get('/products/:id', authMiddleware, productController.getProductById);
router.put('/products/:id', authMiddleware, productController.updateProduct);
router.delete('/products/:id', authMiddleware, productController.deleteProduct);

// ========== Rotas de Estoque (protegidas) ==========
router.post('/products/:id/stock', authMiddleware, productController.updateStock);
router.get('/stock/movements', authMiddleware, stockController.getMovementHistory);
router.get('/stock/movements/product/:productId', authMiddleware, stockController.getProductMovements);
router.get('/stock/stats', authMiddleware, stockController.getMovementStats);

// ========== Rotas de IA (protegidas) ==========
router.get('/ai/predict/:productId', authMiddleware, aiController.predictDemand);
router.get('/ai/replenishment', authMiddleware, aiController.getReplenishmentSuggestions);

module.exports = router;
