const express = require('express');
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

router.route('/')
  .get(getProducts)
  .post(createProduct);   // TODO: proteger con auth + isAdmin (Semana 5-6)

router.route('/:id')
  .get(getProductById)
  .put(updateProduct)     // TODO: proteger
  .delete(deleteProduct); // TODO: proteger

module.exports = router;