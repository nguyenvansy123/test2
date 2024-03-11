const express = require('express');
const router = express.Router();
const {requireSigin,adminMiddleware} = require('../../common-middleware')
const { initialData } = require('../../controllers/admin/initialData');



router.post("/initialData", requireSigin, adminMiddleware, initialData)
module.exports = router;