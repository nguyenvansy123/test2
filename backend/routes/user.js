const express = require("express");
const router = express.Router();
const {  adminMiddleware, requireSigin } = require("../common-middleware");
const {getAllUsers, getApprovedUsers,getAwaitApprovedUsers, deleteUserById, approveUserById} = require("../controllers/user");


router.get('/user/getAllUser',requireSigin,adminMiddleware, getAllUsers)
router.get('/user/getApprovedUsers',requireSigin,adminMiddleware,getApprovedUsers)
router.get('/user/getAwaitApprovedUsers',requireSigin,adminMiddleware,getAwaitApprovedUsers)
router.delete('/user/deleteUsersById/:id',requireSigin,adminMiddleware,deleteUserById)
router.put('/user/approveUsersById/:id',requireSigin,adminMiddleware,approveUserById)

module.exports = router;