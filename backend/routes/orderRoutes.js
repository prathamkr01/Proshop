const express = require('express');


const orderController = require('../controller/orderController')

const protect = require('../middleware/authMiddleware')

const router = express.Router();

router.post('/',protect,orderController.addOrderItems)
router.get('/myorders',protect,orderController.getMyOrders)
router.get('/:id',protect,orderController.getOrderByID)
router.put('/:id/pay',protect,orderController.updateOrderToPaid)

 

module.exports = router;