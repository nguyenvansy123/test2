const express = require("express");
const { userMiddleware,requireSigin } = require("../common-middleware");
const { getOrders, getOrder, addOrder } = require("../controllers/order");
const router = express.Router();


router.post("/addOrder", requireSigin, userMiddleware, addOrder);
router.get("/getOrders", requireSigin, userMiddleware, getOrders);
router.post("/getOrder", requireSigin, userMiddleware, getOrder);

module.exports = router;