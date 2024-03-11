const express = require("express");
const { requireSigin, adminMiddleware } = require("../../common-middleware");
const { updateOrder, getCustomerOrders } = require("../../controllers/admin/order");
const router = express.Router();

router.post('/order/update', requireSigin, adminMiddleware, updateOrder);
router.post('/order/getCustomerOrders', requireSigin, adminMiddleware, getCustomerOrders);


module.exports = router;