const express = require("express");
const { getPosts, createPost } = require("../controllers/post");
const router = express.Router();
const validator = require("../validators");

router.get("/", getPosts);
router.post("/post", validator.createPostValidator, createPost);

module.exports = router;
