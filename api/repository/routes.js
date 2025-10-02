const express = require("express");
const router = express.Router();

const productsController = require("../controllers/ProductRegister");

router.post("/product-register", productsController.createProduct);
router.get("/products", productsController.getProducts)

module.exports = router;
