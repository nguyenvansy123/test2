const express = require("express");
const { createProduct, getProducts, getProductsBySulg, getProductDetailsById, deleteProductById } = require("../controllers/product");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const { requireSigin, adminMiddleware } = require("../common-middleware");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"));
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.get("/product/getproduct", getProducts)
router.get("/product/:productId", getProductDetailsById)
router.post("/product/create", requireSigin, adminMiddleware, upload.array('productPicture'), createProduct)
router.get("/product/:slug", getProductsBySulg)
router.delete("/product/deleteProductId", requireSigin, adminMiddleware, deleteProductById)

module.exports = router