const express = require("express");
const { createPost, getAllPost,  deletePostById, getPostsByUser, updateStatusPostById, getApprovedPosts, getPendingApprovedPosts, downloadFile, updateApprovrePost } = require("../controllers/article");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const { requireSigin, adminMiddleware, upload, userMiddleware } = require("../common-middleware");

router.get("/post/getAllPost", getAllPost)
router.get("/post/getApprovedPost", getApprovedPosts)
router.get("/post/getPendingApprovedPost", getPendingApprovedPosts)
router.get("/post/getPostByUser/:id", getPostsByUser)
router.post('/download/file',downloadFile);
router.post("/post/create", requireSigin, adminMiddleware, upload.fields([{ name: 'linkDowload', maxCount: 1 }, { name: 'arliclePictures', maxCount: 1 }]), createPost)
router.delete("/post/deletePostId/:id", requireSigin, adminMiddleware, deletePostById)
router.post("/post/updateStatusPost/", requireSigin, updateStatusPostById)
router.put("/post/updateApprovrePost/:articleId", requireSigin,adminMiddleware, updateApprovrePost)

module.exports = router 