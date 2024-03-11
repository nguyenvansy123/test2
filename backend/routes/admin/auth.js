var express = require("express");
const { signup, signin,signout } = require("../../controllers/admin/auth");
const { isRequestValidated, validateSignupRequest, validateSigninRequest } = require("../../validators/auth")
var router = express.Router();

router.post("/admin/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/admin/signin",validateSigninRequest, isRequestValidated, signin);
router.post("/admin/signout",signout);

module.exports = router;