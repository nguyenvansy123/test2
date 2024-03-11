const express = require("express");
const { requireSigin, userMiddleware } = require("../common-middleware");
const { addAddress, getAddress } = require("../controllers/address");
const router = express.Router();

router.post("/user/address/create",requireSigin,userMiddleware,addAddress);
router.post("/user/getaddress",requireSigin,userMiddleware,getAddress);


module.exports = router;