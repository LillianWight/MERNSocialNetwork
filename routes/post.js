const express = require("express");
const { getPosts, createPost } = require("../controllers/post");
const router = express.Router();
const { createPostValidator } = require("../validators");
const { requireSignin } = require("../controllers/auth");

router.get("/", requireSignin, getPosts);
router.post("/post", createPostValidator, createPost);

module.exports = router;
