const express = require('express');

const protect = require('../middleware/authMiddleware')


const productController = require('../controller/productController')

const router = express.Router();

router.get('/', productController.getProducts);
router.post('/:id/reviews', protect, productController.createProductReview);

router.get('/:id', productController.getProduct);

module.exports = router;