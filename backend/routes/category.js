const express = require("express");
const { addCategory, getCategories, updateCategories, deleteCategories } = require("../controllers/category");
const router = express.Router();
const {requireSigin,adminMiddleware} = require("../common-middleware")


router.post("/admin/category/create",requireSigin,adminMiddleware,addCategory);
router.get("/category/getcategories",getCategories);
router.post("/admin/category/updatecategory",requireSigin,adminMiddleware,updateCategories);
router.post("/admin/category/deletecategory",requireSigin,adminMiddleware,deleteCategories);

module.exports = router